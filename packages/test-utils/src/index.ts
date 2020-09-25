/*
 * Public API Surface of test-utils
 */
import { axe } from 'jest-axe';

import { screenshot } from './lib/screenshot';
import { render } from './lib/render';

import { waitFor, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

export { screenshot, axe, waitFor, userEvent, render, screen };
