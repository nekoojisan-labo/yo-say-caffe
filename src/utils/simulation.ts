import { GameState, DayResult } from '@/types';

export type CafePolicy =
    | 'STANDARD'            // 通常営業
    | 'QUALITY_PROCUREMENT' // 高級仕入れ (Rep++, Money--)
    | 'EQUIPMENT_REPAIR'    // 什器修理 (Stability++, Money--)
    | 'ADVERTISING'         // チラシ配り (Customers++, Money-)
    | 'CLEANING'            // 特別清掃 (Rep+, Stability+)
    | 'RECRUITMENT'         // 新人教育 (Rep++, Cost++)
    | 'FANTASY_RESTORE';    // 幻力充填 (Stability Max, Money--)

export function runDaySimulation(state: GameState, policy: CafePolicy): DayResult {
    const { money, reputation, glamor, day, shopRank } = state;
    const { level: glamorLevel } = glamor;

    // 1. 客数の計算
    // 基本客数はランクに依存、評判と安定度がボーナス (上位修正)
    const rankBase: Record<string, number> = { 'F': 8, 'E': 14, 'D': 22, 'C': 32, 'B': 45, 'A': 65, 'S': 100 };
    const baseCustomers = rankBase[shopRank] || 8;
    const reputationBonus = reputation * 0.25;
    const stabilityPenalty = Math.max(0, (50 - glamor.stability) * 0.2); // 安定度50以下で客数減
    const randomBonus = Math.floor(Math.random() * 8) - 3; // -3 to 4
    let customers = Math.max(3, Math.floor(baseCustomers + reputationBonus - stabilityPenalty + randomBonus));

    // 2. 施策による数値設定
    let unitPrice = 2000;
    let cogsRate = 0.30; // 0.35 -> 0.30 に下方修正
    let reputationDelta = 0.5; // 自然増
    let stabilityDelta = -3;
    let policyCost = 0;

    switch (policy) {
        case 'STANDARD':
            unitPrice = 2000;
            cogsRate = 0.30;
            reputationDelta = 1;
            stabilityDelta = -3;
            break;
        case 'QUALITY_PROCUREMENT':
            unitPrice = 2500;
            cogsRate = 0.40; // 0.45 -> 0.40 (コスト効率アップ)
            reputationDelta = 8; // 5 -> 8 (評判アップ)
            stabilityDelta = -1; // -2 -> -1 (磨耗抑制)
            break;
        case 'EQUIPMENT_REPAIR':
            unitPrice = 2000;
            stabilityDelta = 25;
            policyCost = 3000; // 8000 -> 3000
            break;
        case 'ADVERTISING':
            unitPrice = 1800;
            customers = Math.floor(customers * 2.2); // 1.8 -> 2.2 (集客力アップ)
            reputationDelta = 3; // 2 -> 3
            policyCost = 2000;
            break;
        case 'CLEANING':
            unitPrice = 2000;
            reputationDelta = 4; // 3 -> 4
            stabilityDelta = 12; // 8 -> 12 (安定度回復アップ)
            break;
        case 'RECRUITMENT':
            unitPrice = 2000;
            reputationDelta = 4;
            policyCost = 2500; // 6000 -> 2500
            break;
        case 'FANTASY_RESTORE':
            unitPrice = 2000;
            stabilityDelta = 70; // 60 -> 70
            policyCost = 5000; // 7000 -> 5000 (コスト減)
            break;
    }

    // 3. リアルな費用計算
    const sales = customers * unitPrice;
    const variableCost = Math.floor(sales * cogsRate);

    // 固定費: 規模（ランク）に伴って上昇（全体的に下方修正）
    const rentScale: Record<string, number> = { 'F': 1000, 'E': 2000, 'D': 4000, 'C': 8000, 'B': 15000, 'A': 25000, 'S': 45000 };
    const rent = rentScale[shopRank] || 1000;
    const labor = baseCustomers * 100; // 200 -> 100
    const utilities = 1000 + (customers * 30); // 2000+50 -> 1000+30
    const maintenance = (11 - glamorLevel) * 600; // 1200 -> 600

    const fixedCost = rent + labor + utilities + maintenance;
    const totalCost = variableCost + fixedCost + policyCost;
    const profit = sales - totalCost;
    const cashAfter = money + profit;

    // 損益分岐点 (Total Fixed Costs / Contribution Margin Ratio)
    const breakEven = Math.floor((fixedCost + policyCost) / (1 - cogsRate));

    // 4. 警告・ペナルティ
    const warnings: string[] = [];
    if (cashAfter <= 10000) warnings.push('手元資金が非常に危険です！');
    if (glamor.stability + stabilityDelta <= 20) warnings.push('カフェが消滅しそうです。至急メンテナンスを！');

    return {
        day,
        sales,
        cogs: variableCost,
        fixedCost,
        variableCost,
        breakdown: {
            rent,
            labor,
            utilities,
            maintenance,
            other: policyCost
        },
        profit,
        cashAfter,
        customers,
        reputationDelta,
        glamorDelta: {
            stability: stabilityDelta
        },
        breakEven,
        warnings,
        ikemenVisits: [],
        protagonistChanges: {},
    };
}
