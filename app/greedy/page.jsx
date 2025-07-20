"use client"
import { AlgorithmList } from "@/components/algorithm-list"

/* ---------- Greedy algorithm functions ---------- */
function activitySelection(activities) {
  if (activities.length === 0) {
    return { selected: [], steps: [{ step: "No activities to select", selected: [] }] }
  }

  // Sort by finish time
  const sorted = activities.map((act, index) => ({ ...act, originalIndex: index })).sort((a, b) => a.finish - b.finish)

  const selected = [sorted[0]]
  const steps = []

  steps.push({
    step: "Sort activities by finish time",
    activities: [...sorted],
    selected: [],
  })

  steps.push({
    step: `Select first activity: ${sorted[0].name} (${sorted[0].start}-${sorted[0].finish})`,
    activities: [...sorted],
    selected: [sorted[0]],
    considering: 0,
  })

  let lastSelected = 0

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].start >= sorted[lastSelected].finish) {
      selected.push(sorted[i])
      lastSelected = i
      steps.push({
        step: `Select ${sorted[i].name} (${sorted[i].start}-${sorted[i].finish}) - no conflict`,
        activities: [...sorted],
        selected: [...selected],
        considering: i,
      })
    } else {
      steps.push({
        step: `Skip ${sorted[i].name} (${sorted[i].start}-${sorted[i].finish}) - conflicts with previous`,
        activities: [...sorted],
        selected: [...selected],
        considering: i,
        skipped: true,
      })
    }
  }

  return { selected, steps }
}

function fractionalKnapsack(items, capacity) {
  if (items.length === 0 || capacity <= 0) {
    return { selected: [], totalValue: 0, steps: [{ step: "No items or capacity", totalValue: 0 }] }
  }

  // Calculate value-to-weight ratio and sort
  const itemsWithRatio = items.map((item, index) => ({
    ...item,
    ratio: item.value / item.weight,
    originalIndex: index,
  }))

  itemsWithRatio.sort((a, b) => b.ratio - a.ratio)

  const selected = []
  const steps = []
  let remainingCapacity = capacity
  let totalValue = 0

  steps.push({
    step: "Sort items by value-to-weight ratio (descending)",
    items: [...itemsWithRatio],
    selected: [],
    totalValue: 0,
    remainingCapacity,
  })

  for (let i = 0; i < itemsWithRatio.length && remainingCapacity > 0; i++) {
    const item = itemsWithRatio[i]

    if (item.weight <= remainingCapacity) {
      // Take full item
      selected.push({ ...item, fraction: 1 })
      remainingCapacity -= item.weight
      totalValue += item.value

      steps.push({
        step: `Take full ${item.name}: weight=${item.weight}, value=${item.value}, ratio=${item.ratio.toFixed(2)}`,
        items: [...itemsWithRatio],
        selected: [...selected],
        totalValue,
        remainingCapacity,
        considering: i,
      })
    } else {
      // Take fractional item
      const fraction = remainingCapacity / item.weight
      const fractionalValue = item.value * fraction
      selected.push({ ...item, fraction })
      totalValue += fractionalValue
      remainingCapacity = 0

      steps.push({
        step: `Take ${(fraction * 100).toFixed(1)}% of ${item.name}: value=${fractionalValue.toFixed(2)}`,
        items: [...itemsWithRatio],
        selected: [...selected],
        totalValue,
        remainingCapacity,
        considering: i,
      })
    }
  }

  return { selected, totalValue, steps }
}

function huffmanCoding(frequencies) {
  if (frequencies.length === 0) {
    return { tree: null, codes: {}, steps: [{ step: "No characters to encode" }] }
  }

  if (frequencies.length === 1) {
    const codes = {}
    codes[frequencies[0].char] = "0"
    return {
      tree: frequencies[0],
      codes,
      steps: [{ step: "Single character - assign code '0'", codes }],
    }
  }

  // Create initial nodes
  const nodes = frequencies.map((freq) => ({
    char: freq.char,
    frequency: freq.frequency,
    left: null,
    right: null,
  }))

  const steps = []
  steps.push({
    step: "Initialize nodes with character frequencies",
    nodes: [...nodes],
    tree: null,
  })

  // Build Huffman tree
  while (nodes.length > 1) {
    // Sort by frequency
    nodes.sort((a, b) => a.frequency - b.frequency)

    // Take two nodes with minimum frequency
    const left = nodes.shift()
    const right = nodes.shift()

    // Create new internal node
    const newNode = {
      char: left.char + right.char,
      frequency: left.frequency + right.frequency,
      left,
      right,
    }

    nodes.push(newNode)

    steps.push({
      step: `Merge '${left.char}' (${left.frequency}) and '${right.char}' (${right.frequency}) -> '${newNode.char}' (${newNode.frequency})`,
      nodes: [...nodes],
      merged: { left, right, newNode },
    })
  }

  const tree = nodes[0]

  // Generate codes
  const codes = {}
  function generateCodes(node, code = "") {
    if (!node.left && !node.right) {
      codes[node.char] = code || "0"
      return
    }
    if (node.left) generateCodes(node.left, code + "0")
    if (node.right) generateCodes(node.right, code + "1")
  }

  generateCodes(tree)

  steps.push({
    step: "Generate Huffman codes from tree",
    tree,
    codes,
  })

  return { tree, codes, steps }
}

function jobScheduling(jobs) {
  if (jobs.length === 0) {
    return { scheduled: [], totalProfit: 0, steps: [{ step: "No jobs to schedule" }] }
  }

  // Sort jobs by profit (descending)
  const sortedJobs = jobs.map((job, index) => ({ ...job, originalIndex: index })).sort((a, b) => b.profit - a.profit)

  const maxDeadline = Math.max(...jobs.map((job) => job.deadline))
  const timeSlots = new Array(maxDeadline).fill(null)
  const scheduled = []
  const steps = []

  steps.push({
    step: "Sort jobs by profit (descending)",
    jobs: [...sortedJobs],
    scheduled: [],
    timeSlots: [...timeSlots],
    totalProfit: 0,
  })

  let totalProfit = 0

  for (let i = 0; i < sortedJobs.length; i++) {
    const job = sortedJobs[i]

    // Find latest available slot before deadline
    let slot = -1
    for (let j = Math.min(job.deadline - 1, maxDeadline - 1); j >= 0; j--) {
      if (timeSlots[j] === null) {
        slot = j
        break
      }
    }

    if (slot !== -1) {
      timeSlots[slot] = job
      scheduled.push(job)
      totalProfit += job.profit

      steps.push({
        step: `Schedule ${job.name} at time slot ${slot + 1}, profit: ${job.profit}`,
        jobs: [...sortedJobs],
        scheduled: [...scheduled],
        timeSlots: [...timeSlots],
        totalProfit,
        considering: i,
        slotAssigned: slot,
      })
    } else {
      steps.push({
        step: `Cannot schedule ${job.name} - no available slots before deadline ${job.deadline}`,
        jobs: [...sortedJobs],
        scheduled: [...scheduled],
        timeSlots: [...timeSlots],
        totalProfit,
        considering: i,
        rejected: true,
      })
    }
  }

  return { scheduled, totalProfit, timeSlots, steps }
}

const greedyAlgorithms = {
  activitySelection: {
    name: "Activity Selection",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    description: "Selects maximum number of non-overlapping activities by choosing earliest finishing activities.",
    code: `function activitySelection(activities) {
  // Sort activities by finish time
  const sorted = activities.sort((a, b) => a.finish - b.finish);
  
  const selected = [sorted[0]];
  let lastSelected = 0;
  
  for (let i = 1; i < sorted.length; i++) {
    // If current activity starts after last selected finishes
    if (sorted[i].start >= sorted[lastSelected].finish) {
      selected.push(sorted[i]);
      lastSelected = i;
    }
  }
  
  return selected;
}`,
    fn: activitySelection,
  },
  fractionalKnapsack: {
    name: "Fractional Knapsack",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    description: "Maximizes value in knapsack by selecting items with highest value-to-weight ratio first.",
    code: `function fractionalKnapsack(items, capacity) {
  // Sort by value-to-weight ratio (descending)
  const sorted = items.sort((a, b) => (b.value/b.weight) - (a.value/a.weight));
  
  let totalValue = 0;
  let remainingCapacity = capacity;
  const selected = [];
  
  for (const item of sorted) {
    if (remainingCapacity === 0) break;
    
    if (item.weight <= remainingCapacity) {
      // Take full item
      selected.push({...item, fraction: 1});
      totalValue += item.value;
      remainingCapacity -= item.weight;
    } else {
      // Take fractional item
      const fraction = remainingCapacity / item.weight;
      selected.push({...item, fraction});
      totalValue += item.value * fraction;
      remainingCapacity = 0;
    }
  }
  
  return { selected, totalValue };
}`,
    fn: fractionalKnapsack,
  },
  huffmanCoding: {
    name: "Huffman Coding",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    description: "Creates optimal prefix-free binary codes by building tree from character frequencies.",
    code: `function huffmanCoding(frequencies) {
  let nodes = frequencies.map(freq => ({
    char: freq.char,
    frequency: freq.frequency,
    left: null,
    right: null
  }));
  
  // Build Huffman tree
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency);
    
    const left = nodes.shift();
    const right = nodes.shift();
    
    const newNode = {
      char: left.char + right.char,
      frequency: left.frequency + right.frequency,
      left,
      right
    };
    
    nodes.push(newNode);
  }
  
  const tree = nodes[0];
  
  // Generate codes
  const codes = {};
  function generateCodes(node, code = '') {
    if (!node.left && !node.right) {
      codes[node.char] = code || '0';
      return;
    }
    if (node.left) generateCodes(node.left, code + '0');
    if (node.right) generateCodes(node.right, code + '1');
  }
  
  generateCodes(tree);
  return { tree, codes };
}`,
    fn: huffmanCoding,
  },
  jobScheduling: {
    name: "Job Sequencing with Deadlines",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
    description: "Schedules jobs to maximize profit while meeting deadlines using greedy approach.",
    code: `function jobScheduling(jobs) {
  // Sort jobs by profit (descending)
  const sorted = jobs.sort((a, b) => b.profit - a.profit);
  
  const maxDeadline = Math.max(...jobs.map(job => job.deadline));
  const timeSlots = new Array(maxDeadline).fill(null);
  const scheduled = [];
  let totalProfit = 0;
  
  for (const job of sorted) {
    // Find latest available slot before deadline
    let slot = -1;
    for (let j = Math.min(job.deadline - 1, maxDeadline - 1); j >= 0; j--) {
      if (timeSlots[j] === null) {
        slot = j;
        break;
      }
    }
    
    if (slot !== -1) {
      timeSlots[slot] = job;
      scheduled.push(job);
      totalProfit += job.profit;
    }
  }
  
  return { scheduled, totalProfit };
}`,
    fn: jobScheduling,
  },
}

export default function GreedyPage() {
  return (
    <AlgorithmList
      title="Greedy Algorithms"
      algorithms={["Activity Selection", "Huffman Coding", "Fractional Knapsack", "Job Sequencing with Deadlines"]}
    />
  )
}
