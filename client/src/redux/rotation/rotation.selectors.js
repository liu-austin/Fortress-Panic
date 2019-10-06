// jshint esversion:6
import { createSelector } from 'reselect';

// input selector
const selectRotation = state => state.rotation;

// output selectors
export const selectRotationAngle = createSelector(
    [selectRotation],
    rotation => rotation.angle
);