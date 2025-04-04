import type { Product } from "@/types"

// Function to calculate Levenshtein distance (edit distance) between two strings
// This helps with fuzzy matching and handling misspellings
export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = []

  // Initialize the matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  // Fill the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1, // deletion
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

// Simple stemming function to reduce words to their root form
export function stemWord(word: string): string {
  // Remove common suffixes
  word = word.toLowerCase()

  // Handle plurals and common endings
  if (word.endsWith("ies")) {
    return word.slice(0, -3) + "y"
  } else if (word.endsWith("es")) {
    return word.slice(0, -2)
  } else if (word.endsWith("s") && !word.endsWith("ss")) {
    return word.slice(0, -1)
  } else if (word.endsWith("ing")) {
    return word.slice(0, -3)
  } else if (word.endsWith("ed")) {
    return word.slice(0, -2)
  }

  return word
}

// Tokenize and normalize search query
export function normalizeQuery(query: string): string[] {
  // Convert to lowercase, remove extra spaces, and split into words
  return query
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "") // Remove special characters
    .split(/\s+/) // Split by whitespace
    .filter((word) => word.length > 1) // Filter out single characters
    .map((word) => stemWord(word)) // Apply stemming
}

// Calculate search score for a product based on the query
export function calculateSearchScore(product: Product, queryTokens: string[]): number {
  if (!product || queryTokens.length === 0) return 0

  // Fields to search in, with weights
  const fields = [
    { key: "name", weight: 10 },
    { key: "category", weight: 5 },
    { key: "description", weight: 3 },
    { key: "color", weight: 2 },
  ]

  let totalScore = 0

  // Process each search token
  for (const token of queryTokens) {
    let tokenScore = 0

    // Check each field
    for (const field of fields) {
      const fieldValue = String(product[field.key as keyof Product] || "").toLowerCase()

      // Skip empty fields
      if (!fieldValue) continue

      // Tokenize the field value
      const fieldTokens = normalizeQuery(fieldValue)

      // Check for exact matches
      if (fieldValue.includes(token)) {
        tokenScore += field.weight * 2
      }

      // Check for token matches
      for (const fieldToken of fieldTokens) {
        // Exact token match
        if (fieldToken === token) {
          tokenScore += field.weight * 2
          continue
        }

        // Partial token match (starts with)
        if (fieldToken.startsWith(token) || token.startsWith(fieldToken)) {
          tokenScore += field.weight * 1.5
          continue
        }

        // Fuzzy match using Levenshtein distance
        const distance = levenshteinDistance(token, fieldToken)
        const maxLength = Math.max(token.length, fieldToken.length)
        const similarity = 1 - distance / maxLength

        // If similarity is high enough (over 70%)
        if (similarity > 0.7) {
          tokenScore += field.weight * similarity
        }
      }
    }

    totalScore += tokenScore
  }

  return totalScore
}

// Main search function
export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim() || !products || products.length === 0) {
    return []
  }

  const queryTokens = normalizeQuery(query)

  // If no valid tokens after normalization, return empty array
  if (queryTokens.length === 0) {
    return []
  }

  // Calculate score for each product
  const scoredProducts = products.map((product) => ({
    product,
    score: calculateSearchScore(product, queryTokens),
  }))

  // Filter products with a score above threshold and sort by score
  return scoredProducts
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product)
}

