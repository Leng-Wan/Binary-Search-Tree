class Tree 
{
  constructor(array)
  {
    //remove duplicate and sort
    let sortedArray = [...new Set(array)].sort((a,b) => a -b)
    
    //build the Tree
    this.root = this.buildingTree(sortedArray,0, sortedArray.length - 1)
  }
  
  buildingTree(array,start,end)
  {
    //base case, no element left 
    if(start > end)  return null;
    
    //find the middle index
    let mid = Math.floor((start + end ) / 2 )
    
    //create new node 
    let root = new Node(array[mid])
    root.left = this.buildingTree(array, start, mid - 1)
    root.right = this.buildingTree(array, mid + 1, end )
    
    return root;
  }
  insert(value)
  {
    this.root = this.insertHelper(value,this.root)
  }
  
  insertHelper(value,currentNode)
  {
    //if currentNode is null 
    if(!currentNode)
    {
      return new Node(value)
    }
    
    //check duplicate 
    if(value === currentNode.data) return currentNode
    
    //go left 
    if(value < currentNode.data)
    {
      currentNode.left = this.insertHelper(value, currentNode.left)
    }
    
    //go right 
    else if(value > currentNode.data)
    {
      currentNode.right = this.insertHelper(value,currentNode.right)
    }
  return currentNode
  }
  
  
  find(value,currentNode = this.root)
  {
  
  //if no node 
    if(!currentNode) return null;
    
    if(value === currentNode.data) return currentNode
    
    else if (value < currentNode.data)
    {
      return this.find(value, currentNode.left)
    }
    else if(value > currentNode.data)
    {
      return this.find(value, currentNode.right)
    }
    else return null
  }
  inOrder(callback)
  {
    if(!callback)
    {
      throw Error("callback function is required")
    }
    this.inOrderHelper(callback, this.root)
  }
  inOrderHelper(callback, currentNode)
  {
    if(!currentNode) return;
    
    //visit left
    this.inOrderHelper(callback, currentNode.left)
    callback(currentNode)
    
    //visit right
    this.inOrderHelper(callback, currentNode.right)
   
  }
  
  preOrder(callback)
  {
    if(!callback)
    {
      throw Error("callback function is required")
    }
    this.preOrderHelper(callback,this.root)
  }
  preOrderHelper(callback,currentNode)
  {
    if(!currentNode) return
    
    callback(currentNode)
    this.preOrderHelper(callback, currentNode.left)
    this.preOrderHelper(callback, currentNode.right)
  }
  
  postOrder(callback)
  {
    if(!callback)
    {
      throw Error("callback function is required")
    }
    this.postOrderHelper(callback,this.root)
  }
  postOrderHelper(callback,currentNode)
  {
    if(!currentNode) return
    
   
    this.postOrderHelper(callback, currentNode.left)
    this.postOrderHelper(callback, currentNode.right)
     callback(currentNode)
  }
  
  levelOrder(callback)
  {
    if(!callback)
    {
      throw new Error("callback function is required")
    }
    if(!this.root) return;
    
    let queue = [this.root] // current node 
    
    while(queue.length>0)
    {
      let currentNode = queue.shift()
      callback(currentNode)
      
      if(currentNode.left) queue.push(currentNode.left)
      if(currentNode.right) queue.push(currentNode.right)
    }
  }
  height(value)
  {
    let node = this.find(value)
    
    if(!node) return null
    
    return this.heightHelper(node)
  }
  heightHelper(node)
  {
    if(node === null) return -1
    
    //calculate left node height
    let leftHeight = this.heightHelper(node.left)
    
    //calculate right node height
    let rightHeight = this.heightHelper(node.right)
    
    return 1 + Math.max(leftHeight,rightHeight)
  }
  
  depth(value)
  {
    return this.depthHelper(value,this.root, 0)
  }
  depthHelper(target, currentNode, currentDepth)
  {
    if(!currentNode) return null;
    
    if(target === currentNode.data) return currentDepth
    
    else 
    {
      if(target<currentNode.data) 
      {
        return this.depthHelper(target,currentNode.left,currentDepth+1)
      }
      else if (target > currentNode.data)
      {
        return this.depthHelper(target,currentNode.right, currentDepth + 1)
      }
    }
  }
  deleteItem(value)
  {
    this.root = this.deleteItemHelper(value, this.root)
  }
  deleteItemHelper(value,currentNode)
  {
    if(!currentNode) return null;
    
    if(value < currentNode.data)
    {
     currentNode.left = this.deleteItemHelper(value, currentNode.left)
     return currentNode
    }
    
    else if(value > currentNode.data)
    {
      currentNode.right = this.deleteItemHelper(value,currentNode.right)
      return currentNode
    }
    else 
    {
      //if no children
      if(!currentNode.left && !currentNode.right) return null
      
      //if has left child 
      if(!currentNode.right) return currentNode.left 
      
      //if has right child 
      if(!currentNode.left) return currentNode.right 
      
      //if has two children 
      let successor = this.findMin(currentNode.right)
      currentNode.data = successor.data
      currentNode.right = this.deleteItemHelper(successor.data, currentNode.right)
      return currentNode
      
    }
  }
  findMin(node)
  {
    while(node.left)
    {
      node = node.left
    }
    return node 
  }
  isBalanced() {
  return this.isBalancedHelper(this.root);
}

isBalancedHelper(node) {
  // Base case: empty tree is balanced
  if (node === null) return true;
  
  // Calculate left and right subtree heights
  let leftHeight = this.heightHelper(node.left);
  let rightHeight = this.heightHelper(node.right);
  
  // Calculate the difference
  let heightDiff = Math.abs(leftHeight - rightHeight);
  
  // Tree is balanced if ALL three conditions are true:
  // 1. Height difference <= 1
  // 2. Left subtree is balanced
  // 3. Right subtree is balanced
  return (heightDiff <= 1) && 
         this.isBalancedHelper(node.left) && 
         this.isBalancedHelper(node.right);
}
rebalance() {
  // Collect all values in sorted order using inOrder traversal
  let values = [];
  this.inOrder((node) => {
    values.push(node.data);
  });
  
  // Rebuild the tree from sorted values
  this.root = this.buildingTree(values, 0, values.length - 1);
}
  
}