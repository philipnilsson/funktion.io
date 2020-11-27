import { FABRIK, init, CLOCKWISE, COUNTER_CLOCKWISE, Skeleton } from "./Skeleton"
import { plus } from "./Linalg"

const HEAD_LENGTH =
  350

export const PELVIS = {
  x: (2 * -3750 + 9140) / 2,
  y: (3107 - 300 - 300) / 2 + 100,
}

const excited = {
  TORSO:
    { x: 0, y: -100 },
  HAND_L:
    { x: -600, y: -600 },
  HAND_R:
    { x: 500, y: -700 },
  LEG_L:
    { x: -400, y: 1400 },
  LEG_R:
    { x: 200, y: 1400 },
  HAND_ORIENTATION_L:
    CLOCKWISE,
  HAND_ORIENTATION_R:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_R:
    CLOCKWISE,
  HEAD:
    { x: 5, y: -10 },
  ON_FLOOR_L:
    true,
  ON_FLOOR_R:
    true
}

const look = {
  TORSO:
    { x: 70, y: -200 },
  HAND_L:
    { x: -400, y: 200 },
  HAND_R:
    { x: 500, y: 200 },
  LEG_L:
    { x: -400, y: 1400 },
  LEG_R:
    { x: 200, y: 1400 },
  HAND_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  HAND_ORIENTATION_R:
    CLOCKWISE,
  LEG_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_R:
    CLOCKWISE,
  HEAD:
    { x: 50, y: -50 },
  ON_FLOOR_L:
    true,
  ON_FLOOR_R:
    true
}

const wave = {
  TORSO:
    { x: 0, y: -300 },
  HAND_L:
    { x: -520, y: 150 },
  HAND_R:
    { x: 1000, y: -1200 },
  LEG_L:
    { x: -400, y: 1400 },
  LEG_R:
    { x: 200, y: 1400 },
  HAND_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  HAND_ORIENTATION_R:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_R:
    CLOCKWISE,
  HEAD:
    { x: 5, y: -10 },
  ON_FLOOR_L:
    true,
  ON_FLOOR_R:
    true
}

export type Pose =
  typeof wave

const squat : Pose = {
  TORSO:
    { x: 0, y: 400 },
  HAND_L:
    { x: -720, y: -550 },
  HAND_R:
    { x: 800, y: -700 },
  LEG_L:
    { x: -200, y: 1400 },
  LEG_R:
    { x: 200, y: 1400 },
  HAND_ORIENTATION_L:
    CLOCKWISE,
  HAND_ORIENTATION_R:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_R:
    CLOCKWISE,
  HEAD:
    { x: 0, y: -45 },
  ON_FLOOR_L:
    true,
  ON_FLOOR_R:
    true,
}

const guitar : Pose = {
  TORSO:
    { x: -600, y: 600 },
  HAND_L:
    { x: -650, y: 650 },
  HAND_R:
    { x: 800, y: -250 },
  LEG_L:
    { x: -300, y: 1400 },
  LEG_R:
    { x: 300, y: 1400 },
  HAND_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  HAND_ORIENTATION_R:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_R:
    COUNTER_CLOCKWISE,
  HEAD:
    { x: -20, y: 40 },
  ON_FLOOR_L:
    false,
  ON_FLOOR_R:
    false,
}

const box : Pose = {
  TORSO:
    { x: 100, y: 100 },
  HAND_L:
    { x: 600, y: -550 },
  HAND_R:
    { x: 800, y: -450 },
  LEG_L:
    { x: -400, y: 1400 },
  LEG_R:
    { x: 200, y: 1400 },
  HAND_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  HAND_ORIENTATION_R:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_R:
    CLOCKWISE,
  HEAD:
    { x: 70, y: 0 },
  ON_FLOOR_L:
    true,
  ON_FLOOR_R:
    true,
}

const reach_l : Pose = {
  TORSO:
    { x: -400, y: -100 },
  HAND_L:
    { x: -1450, y: -1450 },
  HAND_R:
    { x: 0, y: -1000 },
  LEG_L:
    { x: -400, y: 1400 },
  LEG_R:
    { x: 200, y: 1400 },
  HAND_ORIENTATION_L:
    CLOCKWISE,
  HAND_ORIENTATION_R:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_R:
    CLOCKWISE,
  HEAD:
    { x: 0, y: -50 },
  ON_FLOOR_L:
    true,
  ON_FLOOR_R:
    true,

}

const serio = {
  TORSO:
    { x: -202.4421593830332, y: 219.76478149100262 },
  HAND_L:
    { x: -364.39588688945986, y: 79.40488431876611 },
  HAND_R:
    { x: -537.1465295629818, y: 127.99100257069426 },
  LEG_L:
    { x: -400, y: 1400 },
  LEG_R:
    { x: 200, y: 1400 },
  HAND_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  HAND_ORIENTATION_R:
    CLOCKWISE,
  LEG_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_R:
    CLOCKWISE,
  HEAD:
    { x: -30, y: -10 },
  ON_FLOOR_L:
    true,
  ON_FLOOR_R:
    true,

}

const reach_r = {
  TORSO:
    { x: 300, y: -152.72879177377877 },
  HAND_L:
    { x: -974.4215938303339, y: -665.5822622107969 },
  HAND_R:
    { x: 660, y: -1540 },
  LEG_L:
    { x: 260, y: 690 },
  LEG_R:
    { x: 200, y: 1400 },
  HAND_ORIENTATION_L:
    CLOCKWISE,
  HAND_ORIENTATION_R:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_R:
    CLOCKWISE,
  HEAD:
    { x: 5, y: 40 },
  ON_FLOOR_L:
    false,
  ON_FLOOR_R:
    true,

}

const kneel = {
  TORSO:
    { x: 164.39588688946037, y: 565.2660668380465 },
  HAND_L:
    { x: -37.78920308483259, y: 624.6491002570697 },
  HAND_R:
    { x: 458.4832904884322, y: -765.008997429306 },
  LEG_L:
    { x: -457.04370179948558, y: 1300 },
  LEG_R:
    { x: 596.0154241645248, y: 1400 },
  HAND_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  HAND_ORIENTATION_R:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_L:
    CLOCKWISE,
  LEG_ORIENTATION_R:
    CLOCKWISE,
  HEAD:
    { x: 0, y: -40 },
  ON_FLOOR_L:
    false,
  ON_FLOOR_R:
    true,
}

const on_point = {
  TORSO:
    { x: 140.35989717223686, y: -255.29948586118235 },
  HAND_L:
    { x: 3.410605131648481e-13, y: -1599.5154241645243 },
  HAND_R:
    { x: 302.3136246786635, y: -1583.3200514138816 },
  LEG_L:
    { x: 162, y: 800 },
  LEG_R:
    { x: 200, y: 1400 },
  HAND_ORIENTATION_L:
    CLOCKWISE,
  HAND_ORIENTATION_R:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_R:
    CLOCKWISE,
  HEAD:
    { x: 5, y: -10 },
  ON_FLOOR_L:
    false,
  ON_FLOOR_R:
    true,
}

const squat2 : Pose = {
  TORSO:
    { x: 21.593830334190557, y: 727.219794344473 },
  HAND_L:
    { x: -496.6580976863751, y: 1078.1195372750644 },
  HAND_R:
    { x: 496.65809768637564, y: 1083.517994858612 },
  LEG_L:
    { x: -539.8457583547555, y: 1400 },
  LEG_R:
    { x: 637.0179948586122, y: 1400 },
  HAND_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  HAND_ORIENTATION_R:
    CLOCKWISE,
  LEG_ORIENTATION_L:
    COUNTER_CLOCKWISE,
  LEG_ORIENTATION_R:
    CLOCKWISE,
  HEAD:
    { x: 0, y: 0 },
  ON_FLOOR_L:
    true,
  ON_FLOOR_R:
    true,
}

export const POSE_LIST =
  [wave, reach_l, on_point, reach_r, serio, squat, box, guitar, squat2, kneel, excited, look]

export const POSES =
  POSE_LIST.map(mkPose)

function mkPose(pose : typeof guitar) {

  const rightArm : Skeleton = init({
    names: ['rightArm', 'collar'],
    distanceConstraint: HEAD_LENGTH,
    rotationConstraint: [Math.PI / 2, Math.PI / 2],
    children: [{
      names: ['rightArm'],
      distanceConstraint: 1.75 * HEAD_LENGTH,
      children: [{
        orientationConstraint: pose.HAND_ORIENTATION_R,
        target: plus(PELVIS, pose.HAND_R),
        distanceConstraint: 1.75 * HEAD_LENGTH,
        names: ['rightArm'],
      }]
    }]
  })

  const leftArm : Skeleton = init({
    names: ['leftArm', 'collar'],
    distanceConstraint: HEAD_LENGTH,
    rotationConstraint: [-Math.PI / 2, -Math.PI / 2],
    children: [{
      names: ['leftArm'],
      distanceConstraint: 1.75 * HEAD_LENGTH,
      children: [{
        orientationConstraint: pose.HAND_ORIENTATION_L,
        target: plus(PELVIS, pose.HAND_L),
        distanceConstraint: 1.75 * HEAD_LENGTH,
        names: ['leftArm'],
      }]
    }]
  })

  const leftLeg : Skeleton = init({
    names: ['leftLeg'],
    distanceConstraint: HEAD_LENGTH * 0.9,
    rotationConstraint: [
      Math.PI / 2 - Math.PI / 7,
      Math.PI / 2 - Math.PI / 7
    ],
    children: [
      {
        names: ['leftLeg'],
        distanceConstraint: 1.75 * HEAD_LENGTH,
        children: [{
          orientationConstraint: pose.LEG_ORIENTATION_L,
          distanceConstraint: 2.25 * HEAD_LENGTH,
          target: plus(PELVIS, pose.LEG_L),
          names: ['leftLeg'],
        }]
      },
    ]
  })

  const rightLeg : Skeleton = init({
    names: ['rightLeg'],
    distanceConstraint: HEAD_LENGTH * 0.9,
    rotationConstraint: [
      - Math.PI / 2 + Math.PI / 7,
      - Math.PI / 2 + Math.PI / 7
    ],
    children: [{
      names: ['rightLeg'],
      distanceConstraint: 1.75 * HEAD_LENGTH,
      children: [{
        orientationConstraint: pose.LEG_ORIENTATION_R,
        distanceConstraint: 2.25 * HEAD_LENGTH,
        target: plus(PELVIS, pose.LEG_R),
        names: ['rightLeg'],
      }]
    }]
  })

  const torso = init({
    names: ['torso'],
    distanceConstraint: 325,
    globalRotationConstraint: [
      -Math.PI / 2 - Math.PI / 25,
      -Math.PI / 2 + Math.PI / 25,
    ],
  })

  const pelvis = init({
    names: ['pelvis'],
    distanceConstraint: 300,
    globalRotationConstraint: [
      Math.PI / 2 - Math.PI / 15,
      Math.PI / 2 + Math.PI / 15,
    ],
  })

  const root = init({
    names: ['torso'],
    target: plus(PELVIS, pose.TORSO),
    location: { x: 0, y: 0 },
  })

  return {
    pelvis,
    torso,
    leftArm,
    rightHand: rightArm.children[0].children[0],
    leftHand: leftArm.children[0].children[0],
    rightArm,
    leftLeg,
    rightLeg,
    skeleton: FABRIK({
      ...root,
      children: [
        { ...torso, children: [rightArm, leftArm] },
        { ...pelvis, children: [rightLeg, leftLeg] }
      ]
    })
  }
}
