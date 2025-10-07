
const nums1 = [ 1, 2, 3, 4, 5 ];
const nums2 = [ 3, 4, 5, 6, 7];
const numSet1 = new Set(nums1);
const numSet2 = new Set(nums2);

const onlyInSet2 = new Set([...numSet2].filter(x => !numSet1.has(x)));
console.log(`onlyInSet2: ${[...onlyInSet2]}`);
console.log(`numSet2: ${[...numSet2]}`);
