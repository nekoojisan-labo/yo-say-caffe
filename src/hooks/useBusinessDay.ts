import { useEffect, useRef, useCallback } from 'react';
import {
  useCafeStore,
  useInventoryStore,
  useIkemenStore,
  useGameStore,
  useProtagonistStore,
  TIME_SETTINGS,
  SPAWN_CONFIG,
  getTimeOfDay,
} from '@/store';
import { MENU_DATA } from '@/data/menuData';
import { IKEMEN_MASTER_DATA } from '@/data/ikemenData';
import { useAudio } from './useAudio';
import type { DayResult } from '@/types';

export function useBusinessDay() {
  const {
    currentTime,
    isOpen,
    isPaused,
    speed,
    mode,
    customers,
    tick,
    spawnCustomer,
    serveCustomer,
    customerLeave,
    seatCustomer,
    updateCustomerStatus,
    recordIkemenVisit,
    seats,
  } = useCafeStore();

  const { consumeStock } = useInventoryStore();
  const { changeAffection, getIkemen } = useIkemenStore();
  const { addMoney, advanceDay } = useGameStore();
  const { changeStats } = useProtagonistStore();
  const { playSE } = useAudio();

  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSpawnTimeRef = useRef(currentTime);

  // ゲーム時間の進行
  useEffect(() => {
    if (!isOpen || isPaused) {
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current);
        tickIntervalRef.current = null;
      }
      return;
    }

    const intervalMs = TIME_SETTINGS.REAL_MS_TO_GAME_MINUTES / speed;

    tickIntervalRef.current = setInterval(() => {
      tick();
    }, intervalMs);

    return () => {
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current);
      }
    };
  }, [isOpen, isPaused, speed, tick]);

  // 客の来店処理
  useEffect(() => {
    if (!isOpen || isPaused) return;

    // 一定時間ごとに来店判定
    if (currentTime - lastSpawnTimeRef.current >= 5) {
      lastSpawnTimeRef.current = currentTime;

      const timeOfDay = getTimeOfDay(currentTime);
      const baseRate = SPAWN_CONFIG.baseRate[timeOfDay];

      // 来店判定
      if (Math.random() < baseRate) {
        // 空席があるか確認
        const emptySeats = seats.filter((s) => !s.occupied);
        if (emptySeats.length > 0) {
          // イケメン判定
          const isIkemen = Math.random() < SPAWN_CONFIG.ikemenChance;
          let ikemenId: string | undefined;

          if (isIkemen) {
            // 解放済みのイケメンからランダム選択
            const unlockedIkemen = IKEMEN_MASTER_DATA.filter((ik) => {
              const ikemenState = getIkemen(ik.id);
              return ikemenState?.unlocked;
            });

            if (unlockedIkemen.length > 0) {
              const randomIkemen =
                unlockedIkemen[Math.floor(Math.random() * unlockedIkemen.length)];
              ikemenId = randomIkemen.id;
            }
          }

          spawnCustomer(!!ikemenId, ikemenId);
          playSE('door_bell');
        }
      }
    }
  }, [currentTime, isOpen, isPaused, seats, spawnCustomer, getIkemen, playSE]);

  // 客の自動処理（オートモード）
  useEffect(() => {
    if (!isOpen || isPaused || mode !== 'auto') return;

    customers.forEach((customer) => {
      // 入店中 → 席に着く
      if (customer.status === 'entering') {
        const emptySeat = seats.find((s) => !s.occupied);
        if (emptySeat) {
          setTimeout(() => {
            seatCustomer(customer.id, emptySeat.id);
          }, 500);
        }
      }

      // 注文中 → 自動で提供
      if (customer.status === 'ordering' && customer.seatId) {
        setTimeout(() => {
          // ランダムにメニューを選択
          const availableMenus = MENU_DATA.filter(
            (m) => m.unlocked && consumeStock(m.id, 1)
          );

          if (availableMenus.length > 0) {
            // イケメンの場合は好みを優先
            let selectedMenu = availableMenus[0];

            if (customer.isIkemen && customer.ikemenId) {
              const ikemenData = IKEMEN_MASTER_DATA.find(
                (ik) => ik.id === customer.ikemenId
              );
              if (ikemenData) {
                const favoriteMenu = availableMenus.find((m) =>
                  ikemenData.favoriteMenus.includes(m.id)
                );
                if (favoriteMenu) {
                  selectedMenu = favoriteMenu;
                }
              }
            }

            serveCustomer(
              customer.id,
              selectedMenu.id,
              selectedMenu.price,
              selectedMenu.cost
            );

            playSE('register');

            // イケメンの場合は好感度UP
            if (customer.isIkemen && customer.ikemenId) {
              const affectionGain = 2;
              changeAffection(customer.ikemenId, affectionGain);
              recordIkemenVisit(customer.ikemenId, affectionGain);
              playSE('affection_up');
            }
          }

          updateCustomerStatus(customer.id, 'eating');
        }, 1000);
      }

      // 食事中 → 退店
      if (customer.status === 'eating') {
        setTimeout(() => {
          updateCustomerStatus(customer.id, 'leaving');
          setTimeout(() => {
            customerLeave(customer.id);
          }, 500);
        }, 3000 / speed);
      }
    });
  }, [
    customers,
    isOpen,
    isPaused,
    mode,
    seats,
    speed,
    seatCustomer,
    serveCustomer,
    updateCustomerStatus,
    customerLeave,
    consumeStock,
    changeAffection,
    recordIkemenVisit,
    playSE,
  ]);

  // 営業終了処理
  const handleEndDay = useCallback(
    (result: DayResult) => {
      // 売上を加算
      addMoney(result.profit);

      // 日数を進める
      advanceDay();

      // 発注中の商品を在庫に反映
      useInventoryStore.getState().processDayChange();

      // 主人公ステータス変化
      if (result.profit >= 3000) {
        changeStats({ charm: 2 });
      } else if (result.profit >= 1500) {
        changeStats({ charm: 1 });
      } else if (result.profit < 0) {
        changeStats({ charm: -1 });
      }

      if (result.ikemenVisits.length >= 3) {
        changeStats({ talk: 2 });
      } else if (result.ikemenVisits.length >= 1) {
        changeStats({ talk: 1 });
      }

      // 効果音
      if (result.profit >= 0) {
        playSE('coin');
      }
    },
    [addMoney, advanceDay, changeStats, playSE]
  );

  return {
    handleEndDay,
  };
}
