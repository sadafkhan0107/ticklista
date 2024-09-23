import React from 'react';
import { useGrowthBook } from '@growthbook/growthbook-react';
export const Button = () => {
  const growthbook = useGrowthBook();

  // Running an experiment
  const experimentResult = growthbook.run({
    key: "button-test",        // Unique experiment key
    variations: [false, true],         // Variations for A/B testing
  });

  const isVisible = experimentResult.value;  // Result is either 'blue' or 'green'
return (
    <>
      {
        isVisible ? (
          <button>
            Click Me
          </button>
        ) : (
          <button>
            Login here
          </button>
        )
      }
    </>

  );
};