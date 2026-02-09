import { ManagementState, ManagementDecision, WeeklyResult, ShopRank } from '@/types';

/**
 * リアル・経営シミュレーション・エンジン
 */
export const ManagementEngine = {
    /**
     * 週次シミュレーションの実行
     */
    runWeeklySimulation(
        currentState: ManagementState,
        decision: ManagementDecision,
        shopRank: ShopRank
    ): WeeklyResult {
        const { potential, popularity, staffSkill, currentTrend } = currentState;
        const weekCount = currentState.weeklyHistory.length + 1;

        // 1. 外部環境の決定
        const { weatherFactor, weatherLabel } = this.generateWeather();
        const trendFactor = decision.menuDev === currentTrend ? 1.4 : 0.9;
        const neighborhood = this.generateNeighborhood();

        // 2. 客数の計算
        // 客数 = (立地ポテンシャル × 認知度 × トレンド合致度 × 天候係数)
        const basePotential = potential * (popularity / 100);
        let customers = Math.floor(basePotential * trendFactor * weatherFactor * (1 + (decision.shifts * 0.1)));

        // ランクによる補正
        const rankMultiplier: Record<ShopRank, number> = { F: 1, E: 1.5, D: 2.2, C: 3.5, B: 5, A: 8, S: 15 };
        customers = Math.floor(customers * (rankMultiplier[shopRank] || 1));

        // 3. 収支計算 (PL)
        const unitPrice = 1500; // 固定客単価（開発により上位修正）
        const sales = customers * unitPrice;

        // F: 材料費 (30%ベース, 仕入れ量で変動)
        const cogsBase = sales * 0.3;
        const cogs = cogsBase * decision.procurement;

        // L: 人件費 (シフト数に依存)
        const labor = decision.shifts * 50000; // 1シフト5万円/週

        // R: 家賃 (ランク依存) - C/Bランクをやや緩和
        const rentBase: Record<ShopRank, number> = { F: 100000, E: 150000, D: 250000, C: 350000, B: 600000, A: 1200000, S: 2500000 };
        const rent = rentBase[shopRank] || 100000;

        // 広告費/投資
        const ads = decision.investment;

        // 廃棄ロス (仕入れ過多や天候不良で発生)
        const inventoryBalance = decision.procurement - (weatherFactor > 0.8 ? 1.0 : 0.8);
        const loss = inventoryBalance > 0 ? Math.floor(cogs * inventoryBalance * 0.5) : 0;

        const profit = sales - (cogs + labor + rent + ads + loss);

        // 4. 顧客満足度
        // 満足度 = (価格バランス × スタッフ習熟度 × 待ち時間)
        // 待ち時間はシフト数と客数のバランス
        const waitTimeFactor = Math.min(1.2, (decision.shifts * 20) / (customers + 1));
        const satisfaction = Math.floor(80 * (staffSkill / 100) * waitTimeFactor);

        // 5. パラメータ変化
        const popularityDelta = Math.floor((sales / 100000) * 1.2 + (ads / 10000) + (satisfaction - 70) * 0.15);
        const staffSkillDelta = decision.shifts > 0 ? 3 : -1;

        // 6. トピックス生成
        const topics = this.generateTopics(satisfaction, profit, decision);

        // 7. 動的イベント (20%)
        const eventChance = Math.random();
        if (eventChance < 0.2) {
            const event = this.generateDynamicEvent();
            topics.push(`【EVENT】${event.title}: ${event.impact}`);
            // イベントによる数値補正はここでは簡略化
        }

        return {
            week: weekCount,
            sales,
            cogs,
            labor,
            rent,
            ads,
            loss,
            profit,
            customers,
            satisfaction,
            popularityDelta,
            staffSkillDelta,
            topics,
            externalFactors: {
                weather: weatherLabel,
                trend: currentTrend,
                neighborhood
            }
        };
    },

    generateWeather() {
        const roll = Math.random();
        if (roll < 0.5) return { weather: 'clear', weatherFactor: 1.1, weatherLabel: '快晴' };
        if (roll < 0.8) return { weather: 'cloudy', weatherFactor: 0.9, weatherLabel: '曇天' };
        if (roll < 0.95) return { weather: 'rain', weatherFactor: 0.6, weatherLabel: '雨天' };
        return { weather: 'storm', weatherFactor: 0.3, weatherLabel: '荒天' };
    },

    generateNeighborhood() {
        const neighbors = ['穏やか', '活気がある', '競合店がセール中', '工事中', '観光客増加'];
        return neighbors[Math.floor(Math.random() * neighbors.length)];
    },

    generateTopics(satisfaction: number, profit: number, decision: ManagementDecision) {
        const topics = [];
        if (satisfaction > 85) topics.push('「接客が素晴らしい」とSNSで評判です。');
        if (satisfaction < 50) topics.push('「待ち時間が長すぎる」という苦情が出ています。');
        if (profit < 0) topics.push('資金繰りが悪化しています。経費削減を検討してください。');
        if (decision.procurement > 1.5) topics.push('過剰な仕入れにより、バックヤードが圧迫されています。');
        return topics;
    },

    generateDynamicEvent() {
        const events = [
            { title: 'SNSでのバズ', impact: '認知度が大幅に上昇しました！', type: 'positive' },
            { title: 'スタッフの欠勤', impact: '人手不足で満足度が低下しました。', type: 'negative' },
            { title: '競合店の出現', impact: '近隣に大手チェーンが開店しました。', type: 'danger' },
            { title: '雨漏り発生', impact: '修理費用が発生しました。', type: 'negative' },
        ];
        return events[Math.floor(Math.random() * events.length)];
    }
};
