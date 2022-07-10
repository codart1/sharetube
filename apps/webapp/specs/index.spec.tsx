import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { supabasePublic } from '../shared/supabase/supabasePublic';

import Index from '../pages/index';
import { PostData } from '../shared/Videos';

jest.mock('../shared/supabase/supabasePublic');

// @ts-expect-error ignore irrelevant fields
const result: PostData[] = [...Array(10)].map((_, i) => ({
  id: `id:${i}`,
  url: `https://www.youtube.com/watch?v=uDUdoWlK5u${i}`,
  description: `Description for ${i}`,
  title: `Title for video: ${i}`,
  author: {
    email: 'admin@gsharetube.com',
  },
}));

describe('Home page', () => {
  it('should render list of posts', () => {
    supabasePublic.mockGetResult = (state) => {
      expect(state).toStrictEqual({
        amount: 10,
        ordering: ['id', { ascending: false }],
        query: '*, author:profileId (*)',
        table: 'Post',
      });

      return result;
    };

    render(<Index />);

    for (const [i, post] of result.entries()) {
      expect(screen.getByText(`Title for video: ${i}`)).toBeDefined();
      expect(screen.getByText(`Description for ${i}`)).toBeDefined();
      expect(screen.getByText(`Title for video: ${i}`)).toBeDefined();
      expect(screen.getByTestId(`sharedby-${post.id}`).textContent).toBe(
        `Shared by ${post.author.email}`
      );
    }
  });

  it('should re-fetch for posts after receiving INSERT event', () => {
    supabasePublic.mockGetResult = jest.fn((state) => result);

    render(<Index />);

    expect(supabasePublic.mockGetResult).toBeCalledTimes(1);
    act(() => {
      supabasePublic.eventCb?.();
    });
    expect(supabasePublic.mockGetResult).toBeCalledTimes(2);
  });
});
