// 链表

function listNode(val) {
    this.val = val;
    this.next = null
}

const node = new listNode(1)
node.next = new listNode(2)

// const node3 = new listNode(3)
// node3.next = node1.next
// node1.next = node3