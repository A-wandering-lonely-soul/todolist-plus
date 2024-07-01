import { reactive } from 'vue';

export const cards_s = reactive([
  {
    id: 1,
    img1: '权杖.webp',
  },
  {
    id: 2,
    img1: '圣杯.webp',
  },
  {
    id: 3,
    img1: '新币.webp',
  },
  {
    id: 4,
    img1: '宝剑.webp',
  },
]);
export const cards_x = reactive([
  {
    id: 1,
    img1: '女祭司.webp',
  },
  {
    id: 2,
    img1: '皇帝.webp',
  },
  {
    id: 3,
    img1: '恋人.webp',
  },
  {
    id: 4,
    img1: '力量.webp',
  },
  {
    id: 5,
    img1: '隐者.webp',
  },
  {
    id: 6,
    img1: '命运之轮.webp',
  },
  {
    id: 7,
    img1: '正义.webp',
  },
  {
    id: 8,
    img1: '倒吊人.webp',
  },
  {
    id: 9,
    img1: '死神.webp',
  },
  {
    id: 10,
    img1: '节制.webp',
  },
  {
    id: 11,
    img1: '恶魔.webp',
  },
  {
    id: 12,
    img1: '高塔.webp',
  },
  {
    id: 13,
    img1: '星星.webp',
  },
  {
    id: 14,
    img1: '月亮.webp',
  },
  {
    id: 15,
    img1: '太阳.webp',
  },
  {
    id: 16,
    img1: '审判.webp',
  },
  {
    id: 17,
    img1: '世界.webp',
  },
  {
    id: 18,
    img1: '魔术师.webp',
  },
  {
    id: 19,
    img1: '女皇.webp',
  },
  {
    id: 20,
    img1: '教皇.webp',
  },
  {
    id: 21,
    img1: '战车.webp',
  },
  {
    id: 22,
    img1: '愚者.webp',
  },
]);
interface Content {
  [key: string]: string;
}

export const content: Content = {
  '1x1':
    '今天适合静心冥想，聆听内心的声音。女祭司的智慧与权杖的行动力将帮助你找到正确的方向。',
  '1x2':
    '内心的直觉与情感的交融让今天充满了理解和共鸣。你会发现自己与他人的联系更加深厚。',
  '1x3':
    '结合智慧与实际，今天是做出财务决策的好时机。女祭司的洞察力将引导你做出明智的选择。',
  '1x4':
    '今天要信任你的直觉并运用你的理智。女祭司的灵性与宝剑的理性结合，将帮助你解决问题。',
  '2x1':
    '领导力与行动力结合的日子。皇帝的权威和权杖的力量会让你在团队中脱颖而出，带领大家走向成功。',
  '2x2':
    '你在情感关系中展示出坚强和稳定的品质。皇帝的决断力和圣杯的情感支持让今天的你充满魅力和信任。',
  '2x3':
    '财务管理和决策的好日子。皇帝的掌控力与金币的实际财富让今天适合做出重要的财务决策。',
  '2x4':
    '逻辑与权威的结合。皇帝的决断力和宝剑的清晰思维将帮助你解决复杂的问题。',
  '3x1': '爱情与行动的交织。恋人的浪漫与权杖的激情让今天充满了甜蜜和冒险。',
  '3x2':
    '充满感情和爱的日子。恋人的浪漫与圣杯的深情让今天适合与爱人共度美好时光。',
  '3x3':
    '今天在情感和物质生活中找到平衡。恋人的情感支持和金币的实际财富让你感受到安全和满足。',
  '3x4':
    '爱情与理性的平衡。恋人的情感与宝剑的理性结合，帮助你在关系中做出明智的决定。',
  '4x1':
    '今天你将展现出无与伦比的勇气和毅力。力量牌的内在力量与权杖的外在行动力将帮助你克服一切困难。',
  '4x2':
    '你的情感与内在力量结合，今天你将感受到深层次的情感力量。力量牌的坚定与圣杯的柔情让你在人际关系中充满力量。',
  '4x3':
    '今天是展现你财务力量的好时机。力量牌的坚韧与金币的实际财富让你在财务上做出坚决的决定。',
  '4x4':
    '内在力量与理性的结合。力量牌的勇气与宝剑的智慧将帮助你解决复杂的问题，展现你强大的内在力量。',
  '5x1': '今天适合独处和反思。隐士的智慧和权杖的力量将帮助你找到前进的方向。',
  '5x2':
    '这是一个情感内省的日子。隐士的洞察力和圣杯的情感深度将带来内心的宁静和平和。',
  '5x3':
    '你会在财务决策中展现出深思熟虑的品质。隐士的智慧和金币的实际财富相结合，让你做出明智的选择。',
  '5x4':
    '内省与理性的结合。隐士的智慧和宝剑的分析力将帮助你在复杂的问题中找到答案。',
  '6x1':
    '今天充满了变数和机会。命运之轮的变化与权杖的行动力相结合，让你准备好迎接新的挑战。',
  '6x2':
    '情感与命运交织的一天。命运之轮的变化和圣杯的感情深度让你体验到命运的奇妙和情感的变化。',
  '6x3':
    '财务上的变动日。命运之轮的变化和金币的财富相结合，让你在财务上迎接新的机会。',
  '6x4':
    '变化与理性的结合。命运之轮的变化和宝剑的智慧将帮助你应对变化，找到最佳解决方案。',
  '7x1':
    '今天你将展现出公平和行动力。正义牌的公正和权杖的力量相结合，让你在行动中保持公正。',
  '7x2':
    '情感中的公平与平衡。正义牌的公正和圣杯的感情深度让你在关系中找到平衡。',
  '7x3':
    '财务决策中的公平。正义牌的公正和金币的财富相结合，让你做出公正的财务决策。',
  '7x4':
    '公正与理性的结合。正义牌的公平和宝剑的智慧将帮助你在复杂的问题中保持公正。',
  '8x1':
    '这是一个需要耐心和行动力的日子。倒吊人的耐心和权杖的力量相结合，让你在等待中找到行动的方向。',
  '8x2':
    '内心的宁静与情感的结合。倒吊人的耐心和圣杯的感情深度让你在情感中找到平和。',
  '8x3':
    '财务上的耐心与实际。倒吊人的耐心和金币的财富相结合，让你在财务上做出持久的决策。',
  '8x4':
    '耐心与理性的结合。倒吊人的耐心和宝剑的智慧将帮助你在复杂的问题中找到答案。',
  '9x1':
    '今天是变革与重生的日子。死神的变革和权杖的力量相结合，让你迎接新的开始。',
  '9x2': '情感上的重生。死神的变革和圣杯的感情深度让你在情感上迎来新的开始。',
  '9x3':
    '财务上的变革。死神的变革和金币的财富相结合，让你在财务上迎接新的机会。',
  '9x4':
    '变革与理性的结合。死神的变革和宝剑的智慧将帮助你在复杂的问题中找到新的解决方案。',
  '10x1':
    '今天适合平衡与行动。节制牌的平衡和权杖的力量相结合，让你在行动中保持平衡。',
  '10x2': '情感上的平衡。节制牌的平衡和圣杯的感情深度让你在关系中找到平和。',
  '10x3':
    '财务上的平衡。节制牌的平衡和金币的财富相结合，让你在财务上保持稳定。',
  '10x4':
    '平衡与理性的结合。节制牌的平衡和宝剑的智慧将帮助你在复杂的问题中找到平衡。',
  '11x1':
    '这是一个充满诱惑和行动力的日子。恶魔的诱惑和权杖的力量相结合，让你在面对诱惑时保持警惕。',
  '11x2': '情感上的诱惑。恶魔的诱惑和圣杯的感情深度让你在情感中保持警惕。',
  '11x3': '财务上的诱惑。恶魔的诱惑和金币的财富相结合，让你在财务上保持警惕。',
  '11x4':
    '诱惑与理性的结合。恶魔的诱惑和宝剑的智慧将帮助你在面对复杂的问题时保持警惕。',
  '12x1':
    '今天是突发变故与行动的日子。塔牌的突变和权杖的力量相结合，让你在面对突发情况时保持行动力。',
  '12x2': '情感上的突变。塔牌的突变和圣杯的感情深度让你在情感中应对突发情况。',
  '12x3':
    '财务上的突变。塔牌的突变和金币的财富相结合，让你在财务上应对突发情况。',
  '12x4':
    '突变与理性的结合。塔牌的突变和宝剑的智慧将帮助你在面对突发情况时保持清晰的头脑。',
  '13x1':
    '这是一个充满希望和行动力的日子。星星牌的希望和权杖的力量相结合，让你在行动中充满希望。',
  '13x2': '情感上的希望。星星牌的希望和圣杯的感情深度让你在情感中找到希望。',
  '13x3':
    '财务上的希望。星星牌的希望和金币的财富相结合，让你在财务上充满希望。',
  '13x4':
    '希望与理性的结合。星星牌的希望和宝剑的智慧将帮助你在复杂的问题中找到希望。',
  '14x1':
    '今天是充满神秘和行动力的日子。月亮牌的神秘和权杖的力量相结合，让你在行动中保持警惕。',
  '14x2': '情感上的神秘。月亮牌的神秘和圣杯的感情深度让你在情感中保持警惕。',
  '14x3':
    '财务上的神秘。月亮牌的神秘和金币的财富相结合，让你在财务上保持警惕。',
  '14x4':
    '神秘与理性的结合。月亮牌的神秘和宝剑的智慧将帮助你在面对复杂的问题时保持警惕',
  '15x1':
    '今天是充满活力和行动力的日子。太阳牌的活力和权杖的力量相结合，让你在行动中充满能量。',
  '15x2': '情感上的活力。太阳牌的活力和圣杯的感情深度让你在情感中充满阳光。',
  '15x3':
    '财务上的活力。太阳牌的活力和金币的财富相结合，让你在财务上充满能量。',
  '15x4':
    '活力与理性的结合。太阳牌的活力和宝剑的智慧将帮助你在复杂的问题中找到解决方案。',
  '16x1':
    '这是一个重审与行动的日子。审判牌的重审和权杖的力量相结合，让你在行动中做出明智的决定。',
  '16x2':
    '情感上的重审。审判牌的重审和圣杯的感情深度让你在情感中做出明智的决定。',
  '16x3':
    '财务上的重审。审判牌的重审和金币的财富相结合，让你在财务上做出明智的决定。',
  '16x4':
    '重审与理性的结合。审判牌的重审和宝剑的智慧将帮助你在复杂的问题中做出明智的决定。',
  '17x1':
    '今天是圆满与行动的日子。世界牌的圆满和权杖的力量相结合，让你在行动中达到圆满。',
  '17x2': '情感上的圆满。世界牌的圆满和圣杯的感情深度让你在情感中达到圆满。',
  '17x3':
    '财务上的圆满。世界牌的圆满和金币的财富相结合，让你在财务上达到圆满。',
  '17x4':
    '圆满与理性的结合。世界牌的圆满和宝剑的智慧将帮助你在复杂的问题中达到圆满。',
  '18x1':
    '今天是展现创造力和行动力的日子。魔术师的创新与权杖的力量相结合，让你在行动中充满灵感和动力。',
  '18x2':
    '你将会在情感和直觉上找到新的灵感。魔术师的创造力与圣杯的情感深度相结合，让你在情感关系中展现独特的魅力。',
  '18x3':
    '今天是创造财富的好时机。魔术师的智慧与金币的实际财富相结合，让你在财务上做出创新的决策。',
  '18x4':
    '创造力与理性的结合。魔术师的创新能力与宝剑的智慧相结合，让你在复杂的问题中找到独特的解决方案。',
  '19x1':
    '今天是展现母性和行动力的日子。女皇的滋养与权杖的力量相结合，让你在行动中充满关爱和力量。',
  '19x2':
    '情感与母性的结合。女皇的滋养与圣杯的情感深度相结合，让你在关系中感受到温暖和爱。',
  '19x3':
    '财务上的丰收。女皇的滋养与金币的财富相结合，让你在财务上感受到安全和丰饶。',
  '19x4':
    '母性与理性的结合。女皇的滋养与宝剑的智慧相结合，让你在复杂的问题中找到温暖的解决方案。',
  '20x1':
    '传统与行动力的结合。教皇的智慧与权杖的力量相结合，让你在行动中保持传统的价值观。',
  '20x2':
    '情感与智慧的结合。教皇的智慧与圣杯的情感深度相结合，让你在关系中找到平衡和理解。',
  '20x3':
    '财务上的智慧。教皇的智慧与金币的财富相结合，让你在财务上做出明智的决策。',
  '20x4':
    '智慧与理性的结合。教皇的智慧与宝剑的智慧相结合，让你在复杂的问题中找到传统的解决方案。',
  '21x1':
    '今天是展现决心和行动力的日子。战车的决心与权杖的力量相结合，让你在行动中展现坚定的信念。',
  '21x2':
    '情感与决心的结合。战车的决心与圣杯的情感深度相结合，让你在情感关系中展现坚定的信念。',
  '21x3':
    '财务上的决心。战车的决心与金币的财富相结合，让你在财务上做出坚定的决策。',
  '21x4':
    '决心与理性的结合。战车的决心与宝剑的智慧相结合，让你在复杂的问题中展现坚定的信念。',
  '22x1':
    '今天是勇敢冒险的时刻，愚者的无畏与权杖的力量将为你带来新的机遇和挑战。',
  '22x2':
    '这是一个充满情感和直觉的日子。愚者的开放心态与圣杯的情感深度相结合，让你在情感上体验新的开始。',
  '22x3':
    '今天是财务上的新起点。愚者的无畏与金币的财富相结合，让你在财务上迎来新的机会。',
  '22x4':
    '勇敢与理性的结合。愚者的开放心态与宝剑的智慧相结合，让你在面对复杂的问题时保持冷静和创新。',
};
