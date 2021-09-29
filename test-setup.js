import httpAdapter from 'axios/lib/adapters/http';
import axios from 'axios';

jest.mock('ColorThief', () => jest.fn());

axios.defaults.adapter = httpAdapter;
