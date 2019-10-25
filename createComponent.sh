#!/bin/bash

COMPONENT_NAME=$1
FIRST_LETTER=${COMPONENT_NAME::1}

if ! [[ "$FIRST_LETTER" =~ [A-Z] ]]; then
  echo 'Component name must start with a capital letter'
  exit
fi

mkdir ./src/components/$COMPONENT_NAME -p
touch ./src/components/$COMPONENT_NAME/$COMPONENT_NAME.tsx
touch ./src/components/$COMPONENT_NAME/$COMPONENT_NAME.style.ts
touch ./src/components/$COMPONENT_NAME/$COMPONENT_NAME.test.tsx

# index.ts
cat << EOF > src/components/$COMPONENT_NAME/index.ts
import $COMPONENT_NAME from './$COMPONENT_NAME';

export default $COMPONENT_NAME;
EOF

# component .tsx file
cat << EOF > ./src/components/$COMPONENT_NAME/$COMPONENT_NAME.tsx
import React from 'react';
import { ${COMPONENT_NAME}Wrapper } from './${COMPONENT_NAME}.style';

interface Props {}

function $COMPONENT_NAME(props: Props): JSX.Element {
  return (
    <${COMPONENT_NAME}Wrapper>$COMPONENT_NAME</${COMPONENT_NAME}Wrapper>
  );
}

export default $COMPONENT_NAME;
EOF

# styles file
cat << EOF > ./src/components/$COMPONENT_NAME/$COMPONENT_NAME.style.ts
import styled from 'styled-components';

export const ${COMPONENT_NAME}Wrapper = styled.div\`\`;
EOF

# test file
cat << EOF > ./src/components/$COMPONENT_NAME/$COMPONENT_NAME.test.tsx
import React from 'react';
import $COMPONENT_NAME from './$COMPONENT_NAME';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('should render without crashing', () => {
  const { getByText } = render(<${COMPONENT_NAME} />);
  expect(getByText('${COMPONENT_NAME}')).toBeInTheDocument();
});
EOF
