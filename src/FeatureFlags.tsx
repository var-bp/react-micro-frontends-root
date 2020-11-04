import React, { useState, createContext, useMemo, useCallback } from 'react';

interface FeatureFlagsProps {
  children: JSX.Element;
}

// set initial feature flags
const FEATURE_FLAGS = {
  feature1: true,
  feature2: false,
};

export const FeatureFlagsContext = createContext({ ...FEATURE_FLAGS, setFeatureFlag: () => {} });

const FeatureFlags = ({ children }: FeatureFlagsProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [_featureFlags, _setFeatureFlags] = useState(FEATURE_FLAGS);

  const setFeatureFlag = useCallback(
    (feature, value) => {
      // https://eslint.org/docs/rules/no-prototype-builtins
      if (
        Object.prototype.hasOwnProperty.call(_featureFlags, feature) &&
        typeof feature === 'string' &&
        typeof value === 'boolean'
      ) {
        _setFeatureFlags({ ..._featureFlags, [feature]: value });
      }
    },
    [_featureFlags],
  );

  const value = useMemo(
    () => ({
      ..._featureFlags,
      setFeatureFlag,
    }),
    [_featureFlags, setFeatureFlag],
  );

  return <FeatureFlagsContext.Provider value={value}>{children}</FeatureFlagsContext.Provider>;
};

export default FeatureFlags;
