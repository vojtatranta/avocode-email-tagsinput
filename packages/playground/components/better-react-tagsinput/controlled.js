// @flow

import React from 'react'
import TagsInput, { utils } from '@avocode/better-react-tagsinput'

import type { Query, Tags } from '@avocode/better-react-tagsinput/dist/types'

type State = {
  query: Query,
  tags: Tags,
}

export default class Controlled extends React.PureComponent<{}, State> {
  state = {
    query: '',
    tags: [ { value: 'a' }, { value: 'b' } ],
  }

  _handleQueryChange = (query: Query) => {
    this.setState({
      query,
    })
  }

  _handleTagAdded = (
    text: Query,
    event: SyntheticKeyboardEvent<*>
  ) => {
    this.setState((prevState) => {
      return {
        tags: [ ...prevState.tags, { value: text } ],
        query: '',
      }
    })
  }

  _handleTagDeleted = (
    indices: Array<number>,
    event: SyntheticKeyboardEvent<*> | SyntheticMouseEvent<*>,
  ) => {
    this.setState((prevState) => {
      const nextTags = utils.removeTagsByIndices(
        prevState.tags,
        indices
      )

      return {
        tags: nextTags,
      }
    })
  }

  render() {
    return (
      <div>
        <p>
          By passing <code>onQueryChangedRequest</code> callback you can change the value
          of the text on non-tag node. This will allow the value to be 
          updated.
          <br />
          By passing <code>onTagAddedRequest</code> you can then control when the new
          tag is added.
          <br />
          By passing <code>onTagDeleteRequest</code> you can control when and which
          tag is removed.
          <br />
          All these callbacks are provided here so you can create and delete
          tags.
        </p>

        <strong>Props</strong>
        <dl>
          <dt>tags</dt>
          <dd>{this.state.tags.map(t => JSON.stringify(t)).join(' , ')}</dd>
          <dt>query</dt>
          <dd>{this.state.query}</dd>
        </dl>

        <p>
          The input below only receives values from the other input. It is controlled
          but does not provide any callbacks so no changes can be made.
        </p>
        <TagsInput
          tags={this.state.tags}
          query={this.state.query}
          onQueryChangedRequest={() => {}}
          onTagAddedRequest={() => {}}
          onTagDeleteRequest={() => {}}
        />
        <p>
          By passing <code>onTagAddedRequest</code> callback you can capture
          newly created tag. By default <i>Space</i>, <i>Enter</i> and <i>Comma</i> keys
          create tags.
          <br />
          You can override these by passing <code>addTagKeyCodes</code> prop.
        </p>
        <TagsInput
          tags={this.state.tags}
          query={this.state.query}
          onQueryChangedRequest={this._handleQueryChange}
          onTagAddedRequest={this._handleTagAdded}
          onTagDeleteRequest={this._handleTagDeleted}
        />
        <ControlledUpdates />
        <ControlledAdditions />
      </div>
    )
  }
}

class ControlledUpdates extends React.PureComponent<{}, State> {
  state = {
    query: 'query',
    tags: [
      { value: 'a' },
      { value: 'b', state: 'warning' },
      { value: 'c' },
      { value: 'd' },
      { value: 'e' },
      { value: 'f' },
    ],
  }

  _performChanges = () => {
    this.setState({
      tags: [
        { value: 'Z' },
        { value: 'b', state: 'highlight' },
        { value: 'c' },
        { value: 'd' },
        { value: 'Y' },
      ],
      query: '!!!',
    })
  }

  render() {
    return (
      <div>
        <p>
          The controlled input can perform multiple changes at once. This specific
          change will update & remove tags at once and also change query.
          <br />
          <button onClick={this._performChanges}>Change</button>
        </p>
        <strong>Props</strong>
        <dl>
          <dt>tags</dt>
          <dd>{this.state.tags.map(t => JSON.stringify(t)).join(' , ')}</dd>
          <dt>query</dt>
          <dd>{this.state.query}</dd>
        </dl>
        <TagsInput
          name='controlled'
          tags={this.state.tags}
          query={this.state.query}
          onQueryChangedRequest={() => {}}
          onTagAddedRequest={() => {}}
          onTagDeleteRequest={() => {}}
        />
      </div>
    )
  }
}

class ControlledAdditions extends React.PureComponent<{}, State> {
  state = {
    query: 'query',
    tags: [
      { value: 'a' },
      { value: 'b' },
      { value: 'c' },
    ],
  }

  _performChanges = () => {
    this.setState({
      tags: [
      { value: 'a' },
      { value: 'b' },
      { value: 'c' },
      { value: 'd' },
      { value: 'e' },
      ],
      query: 'changed',
    })
  }

  render() {
    return (
      <div>
        <p>
          The controlled input can perform multiple changes at once. This specific
          change will update & remove tags at once and also change query.
          <br />
          <button onClick={this._performChanges}>Change</button>
        </p>
        <strong>Props</strong>
        <dl>
          <dt>tags</dt>
          <dd>{this.state.tags.map(t => JSON.stringify(t)).join(' , ')}</dd>
          <dt>query</dt>
          <dd>{this.state.query}</dd>
        </dl>
        <TagsInput
          name='controlled'
          tags={this.state.tags}
          query={this.state.query}
          onQueryChangedRequest={() => {}}
          onTagAddedRequest={() => {}}
          onTagDeleteRequest={() => {}}
        />
      </div>
    )
  }
}

