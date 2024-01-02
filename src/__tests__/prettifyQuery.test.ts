import prettifyQuery from '@/utils/prettifyQuery';

describe('prettifyQuery', () => {
  it('should prettify a simple query', () => {
    const query = 'query { user { id name } }';
    const prettifiedQuery = prettifyQuery(query);

    const expectedPrettifiedQuery = `
query {
  user {
    id
    name
  }
}
`.trim();

    expect(prettifiedQuery).toEqual(expectedPrettifiedQuery);
  });

  it('should handle nested queries and mutations', () => {
    const query =
      'query { user { id name posts { title } } mutation { addUser { id name } } }';
    const prettifiedQuery = prettifyQuery(query);

    const expectedPrettifiedQuery = `
query {
  user {
    id
    name
    posts {
      title
    }
  }
  mutation {
    addUser {
      id
      name
    }
  }
}
`.trim();

    expect(prettifiedQuery).toEqual(expectedPrettifiedQuery);
  });

  it('should handle inline fragments and variables', () => {
    const query =
      'query CommentsForPost($postId: ID!) {post(postId: $postId) {title body author comments {...CoreCommentFields}}}';
    const prettifiedQuery = prettifyQuery(query);

    const expectedPrettifiedQuery = `
query CommentsForPost($postId: ID!) {
  post(postId: $postId) {
    title
    body
    author
    comments {
      ...CoreCommentFields
    }
  }
}
  `.trim();

    expect(prettifiedQuery).toEqual(expectedPrettifiedQuery);
  });

  it('should handle empty queries', () => {
    const query = '';
    const prettifiedQuery = prettifyQuery(query);

    expect(prettifiedQuery).toEqual('');
  });
});
