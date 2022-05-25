import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { DialogService } from '@core/services/dialog.service';


interface CategoryNode {
  id: string;
  name: string;
  parentId: string;
  level: number;
  children: CategoryNode[];
  editing: boolean;
}

interface CategoryFlatNode {
  expandable: boolean;
  deletable: boolean;
  name: string;
  parentId: string;
  id: string;
  level: number;
  editing: boolean;
}

@Component({
  selector: 'app-category-manager-sidebar',
  templateUrl: './category-manager-sidebar.component.html',
  styleUrls: ['./category-manager-sidebar.component.scss']
})
export class CategoryManagerSidebarComponent implements OnInit {
  flatNodeMap = new Map<CategoryFlatNode, CategoryNode>();
  dataChange = new BehaviorSubject<CategoryNode[]>([]);
  categoryTree: any[];
  treeControl = new FlatTreeControl<CategoryFlatNode>(node => node.level, node => node.expandable);
  treeFlattener: MatTreeFlattener<CategoryNode, CategoryFlatNode>;
  dataSource: MatTreeFlatDataSource<CategoryNode, CategoryFlatNode>;
  currentNode: any;

  constructor(
    private dialogServ: DialogService,
    public dialogRef: MatDialogRef<CategoryManagerSidebarComponent>
  ) {
  }

  ngOnInit(): void {
    this.treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });

    
  }

  get data(): CategoryNode[] {
    if (this.currentNode) {
      setTimeout(() => {
        let node = this.treeControl.dataNodes.find(n => n.id === this.currentNode.id);
        while (node) {
          this.treeControl.expand(node);
          node = this.treeControl.dataNodes.find(n => n.id === node.parentId);
        }
      }, 100);
    } else {
      setTimeout(() => {
        this.treeControl.expand(this.treeControl.dataNodes[0]);
      }, 100);
    }
    return this.dataChange.value;
  }

  // tree hasChild
  hasChild(_: number, node: CategoryFlatNode): any {
    return node.expandable;
  }

  // tree hasNoContent
  hasNoContent(_: number, node: CategoryFlatNode): boolean {
    return node.name === '';
  }

  // tree transformer
  transformer = (node: CategoryNode, level: number) => {
    const flatNode: CategoryFlatNode = {
      expandable: node.children !== null, // !!node.children && node.children.length > 0,
      deletable: node.children === null || node.children?.length === 0,
      name: node.name,
      id: node.id,
      parentId: node.parentId,
      level,
      editing: false,
    };
    this.flatNodeMap.set(flatNode, node);
    return flatNode;
  }

  insertItem(parent: CategoryNode, name: string): void {
    const item = {
      id: '',
      name,
      parentId: parent.id,
      children: [],
      level: parent.level + 1,
      editing: false,
    };
    if (parent.children) {
      parent.children.push(item as CategoryNode);
    } else {
      parent.children = [item as CategoryNode];
    }
    this.dataChange.next(this.data);
  }

  addNewItem(node: CategoryFlatNode): void {
    const parentNode = this.flatNodeMap.get(node);
    this.currentNode = parentNode;
    this.insertItem(parentNode, '');
  }

  saveNode(node: CategoryFlatNode, itemValue: string): void {
    const nestedNode = this.flatNodeMap.get(node);
    nestedNode.name = itemValue;
    if (node.parentId === 'root') { // to create marketing category, level 2
    } else {  // to create job
      let marketingCategory = null;
      if (node.parentId.startsWith('category-')) {  // level 3
        marketingCategory = node.parentId.replace('category-', '');
      }
    }
  }

  updateNode(node: CategoryFlatNode): void {
    this.dialogServ.showWarning('Are you sure you want to update this category?', 'Yes')
      .subscribe(response => {
        if (response) {
          this.currentNode = node;
          const nestedNode = this.flatNodeMap.get(node);
          nestedNode.name = node.name;
          if (node.id.startsWith('category-')) {
          } else {
          }
        }
      });
  }

  deleteNode(node: CategoryFlatNode): void {
    this.dialogServ.showWarning('Are you sure you want to delete this category?', 'Yes')
      .subscribe(response => {
        if (response) {
          this.currentNode = null;
          const parentNode = this.treeControl.dataNodes.find(n => n.id === node.parentId);
          if (parentNode) {
            const parent = this.flatNodeMap.get(parentNode);
            parent.children = parent.children.filter(child => child.id !== node.id);
            if (parent.children.length === 0) {
              parent.editing = false;
              parent.children = [];
            }
            this.currentNode = parentNode;
          }
          this.flatNodeMap.delete(node);
          if (node.id.startsWith('category-')) {
          } else {
          }
        }
      });
  }

  onClickName(node): void {
    if (node.level >= 2) {
      node.editing = true;
    }
  }

  onClose(data?: any): void {
    this.dialogRef.close(data);
  }
}
