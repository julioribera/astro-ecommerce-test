// REALIZAR CONSULTAS A LA API DE SALEOR
async function fetchGraphQL(query, variables = {}) {
  const endpoint = "https://store-cs29ogoa.eu.saleor.cloud/graphql/";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();
  return data;
}

// LISTA DE PRODUCTOS
export async function getProducts(first = 30, channel = "default-channel") {
  const query = `{
    products(first: ${first}, channel: "${channel}") {
      edges {
        node {
          id
          name
          isAvailableForPurchase
          pricing {
            priceRange {
              start {
                net {
                  amount
                }
              }
            }
          }
          thumbnail(format: WEBP, size: 300) {
            url
          }
          images {
            url(format: WEBP)
          }
          description
          slug
        }
      }
      totalCount
    }
  }`;

  // No necesitas variables aquí, pero si la consulta las tuviera, podrías pasarlas como segundo argumento
  return await fetchGraphQL(query);
}

// DETALLE DE UN PRODUCTO
export async function getProductBySlug(slug) {
  // Nota cómo se utiliza $slug para definir la variable dentro de la consulta GraphQL
  const query = `query ProductBySlug($slug: String!) {
    product(slug: $slug, channel: "default-channel") {
      id
      name
      pricing {
        priceRange {
          start {
            net {
              amount
            }
          }
        }
      }
      images {
        url(format: WEBP)
      }
      description
      category {
        name
      }
    }
  }`;

  // Aquí pasamos las variables como un objeto donde las claves coinciden con la definición de variables en la consulta
  const variables = {slug};
  return await fetchGraphQL(query, variables);
}
