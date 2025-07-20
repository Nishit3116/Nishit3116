"use client"
import { AlgorithmList } from "@/components/algorithm-list"

/* ---------- Dynamic Programming algorithm functions ---------- */
function fibonacci(n) {
  if (n <= 0) return { result: 0, steps: [{ step: "Invalid input - n must be positive", value: 0 }] }
  if (n === 1) return { result: 1, steps: [{ step: "Base case: F(1) = 1", value: 1 }] }

  const dp = [0, 1]
  const steps = [{ step: "Initialize: F(0) = 0, F(1) = 1", dp: [0, 1], computing: null }]

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
    steps.push({
      step: `F(${i}) = F(${i - 1}) + F(${i - 2}) = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
      dp: [...dp],
      computing: i,
    })
  }

  return { result: dp[n], steps }
}

function knapsack(weights, values, capacity) {
  if (weights.length === 0 || capacity <= 0) {
    return { result: 0, steps: [{ step: "Empty knapsack or no capacity", value: 0 }] }
  }

  const n = weights.length
  const dp = Array(n + 1)
    .fill(null)
    .map(() => Array(capacity + 1).fill(0))
  const steps = []

  steps.push({ step: "Initialize DP table with zeros", dp: dp.map((row) => [...row]), computing: null })

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        const include = values[i - 1] + dp[i - 1][w - weights[i - 1]]
        const exclude = dp[i - 1][w]
        dp[i][w] = Math.max(include, exclude)
        steps.push({
          step: `Item ${i}: weight=${weights[i - 1]}, value=${values[i - 1]}, capacity=${w}. Max(${include}, ${exclude}) = ${dp[i][w]}`,
          dp: dp.map((row) => [...row]),
          computing: { i, w },
        })
      } else {
        dp[i][w] = dp[i - 1][w]
        steps.push({
          step: `Item ${i}: weight=${weights[i - 1]} > capacity=${w}, skip. Value = ${dp[i][w]}`,
          dp: dp.map((row) => [...row]),
          computing: { i, w },
        })
      }
    }
  }

  return { result: dp[n][capacity], steps, table: dp }
}

function lcs(str1, str2) {
  if (str1.length === 0 || str2.length === 0) {
    return { result: 0, steps: [{ step: "One or both strings are empty", length: 0 }] }
  }

  const m = str1.length
  const n = str2.length
  const dp = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0))
  const steps = []

  steps.push({ step: "Initialize DP table", dp: dp.map((row) => [...row]), computing: null })

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
        steps.push({
          step: `Match: '${str1[i - 1]}' = '${str2[j - 1]}', LCS[${i}][${j}] = ${dp[i][j]}`,
          dp: dp.map((row) => [...row]),
          computing: { i, j },
        })
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
        steps.push({
          step: `No match: '${str1[i - 1]}' ≠ '${str2[j - 1]}', LCS[${i}][${j}] = max(${dp[i - 1][j]}, ${dp[i][j - 1]}) = ${dp[i][j]}`,
          dp: dp.map((row) => [...row]),
          computing: { i, j },
        })
      }
    }
  }

  return { result: dp[m][n], steps, table: dp }
}

function coinChange(coins, amount) {
  if (amount === 0) return { result: 0, steps: [{ step: "Amount is 0, no coins needed", value: 0 }] }
  if (coins.length === 0) return { result: -1, steps: [{ step: "No coins available", value: -1 }] }

  const dp = Array(amount + 1).fill(Number.POSITIVE_INFINITY)
  dp[0] = 0
  const steps = []

  steps.push({ step: "Initialize: dp[0] = 0, others = ∞", dp: [...dp], computing: null })

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Number.POSITIVE_INFINITY) {
        const newValue = dp[i - coin] + 1
        if (newValue < dp[i]) {
          dp[i] = newValue
          steps.push({
            step: `Amount ${i}: using coin ${coin}, dp[${i}] = dp[${i - coin}] + 1 = ${newValue}`,
            dp: [...dp],
            computing: i,
          })
        }
      }
    }
  }

  return { result: dp[amount] === Number.POSITIVE_INFINITY ? -1 : dp[amount], steps }
}

const dpAlgorithms = {
  fibonacci: {
    name: "Fibonacci Sequence",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Computes the nth Fibonacci number using dynamic programming to avoid redundant calculations.",
    code: `function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  
  const dp = [0, 1];
  const steps = [];
  
  steps.push({
    step: "Initialize: F(0) = 0, F(1) = 1",
    dp: [0, 1]
  });
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({
      step: \`F(\${i}) = F(\${i - 1}) + F(\${i - 2}) = \${dp[i - 1]} + \${dp[i - 2]} = \${dp[i]}\`,
      dp: [...dp],
      computing: i
    });
  }
  
  return { result: dp[n], steps };
}`,
    fn: fibonacci,
  },
  knapsack: {
    name: "0/1 Knapsack Problem",
    timeComplexity: "O(nW)",
    spaceComplexity: "O(nW)",
    description: "Finds the maximum value that can be obtained with given weight and value constraints.",
    code: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
  const steps = [];
  
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        const include = values[i - 1] + dp[i - 1][w - weights[i - 1]];
        const exclude = dp[i - 1][w];
        dp[i][w] = Math.max(include, exclude);
        
        steps.push({
          step: \`Item \${i}: weight=\${weights[i - 1]}, value=\${values[i - 1]}, capacity=\${w}. Max(\${include}, \${exclude}) = \${dp[i][w]}\`,
          dp: dp.map(row => [...row]),
          computing: { i, w }
        });
      } else {
        dp[i][w] = dp[i - 1][w];
        steps.push({
          step: \`Item \${i}: weight=\${weights[i - 1]} > capacity=\${w}, skip. Value = \${dp[i][w]}\`,
          dp: dp.map(row => [...row]),
          computing: { i, w }
        });
      }
    }
  }
  
  return { result: dp[n][capacity], steps, table: dp };
}`,
    fn: knapsack,
  },
  lcs: {
    name: "Longest Common Subsequence",
    timeComplexity: "O(mn)",
    spaceComplexity: "O(mn)",
    description: "Finds the length of the longest subsequence common to two sequences.",
    code: `function lcs(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  const steps = [];
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        steps.push({
          step: \`Match: '\${str1[i - 1]}' = '\${str2[j - 1]}', LCS[\${i}][\${j}] = \${dp[i][j]}\`,
          dp: dp.map(row => [...row]),
          computing: { i, j }
        });
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        steps.push({
          step: \`No match: '\${str1[i - 1]}' ≠ '\${str2[j - 1]}', LCS[\${i}][\${j}] = max(\${dp[i - 1][j]}, \${dp[i][j - 1]}) = \${dp[i][j]}\`,
          dp: dp.map(row => [...row]),
          computing: { i, j }
        });
      }
    }
  }
  
  return { result: dp[m][n], steps, table: dp };
}`,
    fn: lcs,
  },
  coinChange: {
    name: "Coin Change Problem",
    timeComplexity: "O(amount × coins)",
    spaceComplexity: "O(amount)",
    description: "Finds the minimum number of coins needed to make a given amount.",
    code: `function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  const steps = [];
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        const newValue = dp[i - coin] + 1;
        if (newValue < dp[i]) {
          dp[i] = newValue;
          steps.push({
            step: \`Amount \${i}: using coin \${coin}, dp[\${i}] = dp[\${i - coin}] + 1 = \${newValue}\`,
            dp: [...dp],
            computing: i
          });
        }
      }
    }
  }
  
  return { result: dp[amount] === Infinity ? -1 : dp[amount], steps };
}`,
    fn: coinChange,
  },
}

export default function DynamicProgrammingPage() {
  return (
    <AlgorithmList
      title="Dynamic Programming Algorithms"
      algorithms={[
        "Fibonacci (DP)",
        "0/1 Knapsack",
        "Longest Common Subsequence",
        "Edit Distance",
        "Coin Change",
        "Matrix Chain Multiplication",
      ]}
    />
  )
}
