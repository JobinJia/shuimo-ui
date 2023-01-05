/**
 * @description patch templates
 * @author 阿怪
 * @date 2022/12/19 01:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MNodeTemplate, PatchMVNodeTemplate } from '../../../types/template/template';
import { isEqual } from './tools';


const compareObject = (oldObj: Record<string, any>, newObj: Record<string, any>) => {
  // deep compare object

};

type MProps = MNodeTemplate['props'];
export const patch = (oldNode: MNodeTemplate, newNode: MNodeTemplate) => {
  const res: PatchMVNodeTemplate = {};
  if (isEqual(oldNode, newNode)) {return res;}
  // different type
  if (oldNode.type !== newNode.type) {
    Object.assign(res, newNode);
    return res;
  }

  // same type
  // different props
  if (!isEqual(oldNode.props, newNode.props)) {
    res.props = patchProps(oldNode.props, newNode.props);
  }

  // different children
  const oldChildren = oldNode.children;
  // todo fix object no index error
  if (!oldChildren) {
    // @ts-ignore  fix type error
    res.children = newNode.children;
  } else {
    res.children = {};
    const newChildren = newNode.children;
    for (const key in newChildren) {
      if (!isEqual(oldChildren[key], newChildren[key])) {
        res.children[key] = patch(oldChildren[key], newChildren[key]);
      }
    }
  }

  // different slots
  if (!isEqual(oldNode.slots, newNode.slots)) {
    let add: string[] | undefined, remove: string[] | undefined;
    if (!newNode.slots) {
      remove = oldNode.slots;
    } else if (!oldNode.slots) {
      add = newNode.slots;
    } else {
      add = newNode.slots.filter((slot) => !oldNode.slots!.includes(slot));
      remove = oldNode.slots.filter((slot) => !newNode.slots!.includes(slot));
    }
    res.slots = { add, remove };
  }

  if (oldNode.if !== newNode.if) {
    res.if = newNode.if;
  }
  if (oldNode.show !== newNode.show) {
    res.show = newNode.show;
  }

  return res;
};


const patchProps = (oldProps: MProps | undefined, newProps: MProps | undefined) => {
  if (!oldProps) {return newProps;}
  if (!newProps) {return { remove: Object.keys(oldProps) };}

  const updateProps: MProps = {};
  const removeProps: string[] = [];

  const oldKeys = Object.keys(oldProps);
  const newKeys = Object.keys(newProps);
  const hasComparedKeys = new Set<string>();
  // todo find a faster way to do this
  for (const key of oldKeys) {
    if (newProps[key] === oldProps[key]) {
      hasComparedKeys.add(key);
      continue;
    }
    if (!newKeys.includes(key)) {
      removeProps.push(key);
    }
  }
  for (const key of newKeys) {
    if (hasComparedKeys.has(key)) {continue;}
    updateProps[key] = newProps[key];
  }

  return {
    update: updateProps,
    remove: removeProps
  };
};