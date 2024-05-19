export const FETCH_CATEGORY_LIST = `{
  categoriesCollection {
    edges {
      node {
        id
        name
      }
    }
  }
}`;

export const FETCH_ITEM_LIST = `query ($limit: Int, $cursor: Cursor, $filter: itemsFilter, $order: [itemsOrderBy!]) {
    itemsCollection(after: $cursor, first: $limit, filter: $filter, orderBy: $order) {
      edges {
        node {
          id
          name
          price
          base_uom
          increment_by
          image_src
          categories {
            id
            name
          }
          is_active
          created_at
          updated_at
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }`;
