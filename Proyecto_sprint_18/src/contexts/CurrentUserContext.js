import { createContext, useState, useEffect } from 'react';
import { api } from '../utils/Api.js';

const CurrentUserContext = createContext();

export default CurrentUserContext;