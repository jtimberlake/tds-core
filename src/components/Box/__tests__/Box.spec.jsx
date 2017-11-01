import React from 'react'
import {shallow} from 'enzyme'

import Box from '../Box'

describe.skip('Box deprecated', () => {
  const defaultProps = {
    spacing: 'padding',
    vertical: 2,
  }

  const doShallow = (props = {}) =>
    shallow(
      <Box {...defaultProps} {...props}>
        Some content
      </Box>
    )

  it('can have padding or margin', () => {
    let box = doShallow({spacing: 'padding', all: 1})
    expect(box).toHaveClassName('allPadding-1')

    box = doShallow({spacing: 'margin', all: 1})
    expect(box).toHaveClassName('allMargin-1')
  })

  it('can have directional spacing', () => {
    let box = doShallow({spacing: 'padding', top: 1})
    expect(box).toHaveClassName('topPadding-1')

    box = doShallow({spacing: 'padding', top: 1, right: 2})
    expect(box).toHaveClassName('topPadding-1 rightPadding-2')

    box = doShallow({spacing: 'padding', top: 1, right: 2, bottom: 3})
    expect(box).toHaveClassName('topPadding-1 rightPadding-2 bottomPadding-3')

    box = doShallow({spacing: 'padding', top: 1, right: 2, bottom: 3, left: 4})
    expect(box).toHaveClassName('topPadding-1 rightPadding-2 bottomPadding-3 leftPadding-4')
  })
})

describe('Box', () => {
  const defaultProps = {
    spacing: 'padding',
    vertical: 2,
  }

  const doShallow = (props = {}) =>
    shallow(
      <Box {...defaultProps} {...props}>
        Some content
      </Box>
    )

  it('renders', () => {
    const box = doShallow()

    expect(box).toMatchSnapshot()
  })

  it('can have vertical or horizontal spacing', () => {
    let box = doShallow({y: 1})
    expect(box).toHaveClassName('verticalPadding-1')

    box = doShallow({x: 1})
    expect(box).toHaveClassName('horizontalPadding-1')
  })

  it('can have horizontal and vertical spacing of different scales', () => {
    const box = doShallow({y: 1, x: 2})

    expect(box).toHaveClassName('verticalPadding-1 horizontalPadding-2')
  })

  it('can be either inline or block', () => {
    let box = doShallow()
    expect(box).toHaveTagName('div')

    box = doShallow({inline: true})
    expect(box).toHaveTagName('span')
  })

  it('will add additional arbitrary class names', () => {
    const box = doShallow({inset: 3, dangerouslyAddClassName: 'a-class'})

    expect(box).toHaveClassName('verticalPadding-3 horizontalPadding-3 a-class')
  })

  it('passes additional attributes to the element', () => {
    const box = doShallow({id: 'the-id', 'data-some-attr': 'some value'})

    expect(box).toHaveProp('id', 'the-id')
    expect(box).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const box = doShallow({className: 'my-custom-class', style: {color: 'hotpink'}})

    expect(box).not.toHaveProp('className', 'my-custom-class')
    expect(box).not.toHaveProp('style')
  })
})
