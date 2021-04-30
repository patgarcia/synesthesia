import React from 'react';

// The defaultValue argument is only used when a component does not have a
// matching Provider above it in the tree. This default value can be helpful 
// for testing components in isolation without wrapping them. 
// Note: passing undefined as a Provider value does not cause consuming 
// components to use defaultValue.

export const SynesthesiaContext = React.createContext();