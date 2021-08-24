const dealTreeData = (arr) => {
    let treeData = []
    arr.forEach(item => {
        if (!item.parentCode) {
            treeData.push(item)
        }
    })
    function getJsonTree (data, parentCode) {

        let itemArr=[]

        for(let i=0;i<data.length;i++){	
            let node=data[i]

            if(node.parentCode == parentCode ){	
                let childrens = getJsonTree(data, node.code)
                let newNode = {...node}
                if (childrens.length) {
                    newNode.children = childrens
                }
                itemArr.push(newNode);				 
            }
        }

        return itemArr
    }
    treeData.forEach(tree => {
        tree.children = getJsonTree(arr, tree.code)
    })
    return treeData
}

export default dealTreeData