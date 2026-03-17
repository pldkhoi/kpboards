import { createWrapperForRenderHook } from '@/test/test-utils';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useToggle from './use-toggle';

describe('useToggle', () => {
  it('starts as false by default', () => {
    const { result } = renderHook(() => useToggle(), {
      wrapper: createWrapperForRenderHook(),
    });
    expect(result.current.toggle).toBe(false);
  });

  it('starts as true when defaultChecked is true', () => {
    const { result } = renderHook(() => useToggle(true), {
      wrapper: createWrapperForRenderHook(),
    });
    expect(result.current.toggle).toBe(true);
  });

  it('toggles on onToggle', () => {
    const { result } = renderHook(() => useToggle(), {
      wrapper: createWrapperForRenderHook(),
    });
    act(() => result.current.onToggle());
    expect(result.current.toggle).toBe(true);
    act(() => result.current.onToggle());
    expect(result.current.toggle).toBe(false);
  });

  it('sets true on onOpen', () => {
    const { result } = renderHook(() => useToggle(), {
      wrapper: createWrapperForRenderHook(),
    });
    act(() => result.current.onOpen());
    expect(result.current.toggle).toBe(true);
  });

  it('sets false on onClose', () => {
    const { result } = renderHook(() => useToggle(true), {
      wrapper: createWrapperForRenderHook(),
    });
    act(() => result.current.onClose());
    expect(result.current.toggle).toBe(false);
  });
});
