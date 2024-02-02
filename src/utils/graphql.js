// src/api/graphql.js
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
