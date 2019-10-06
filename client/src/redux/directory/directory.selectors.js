// jshint esversion:6
import { createSelector } from 'reselect';

// input selector
const selectDirectory = state => state.directory;

// output selector
export const selectDirectorySection = createSelector(
    [selectDirectory],
    directory => directory.sections
);
