import { gql } from '@apollo/client'

export const GET_ARTICLE_TEASERS = gql`
  query GetArticleTeasers($first: Int = 10) {
    nodeArticles(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        changed {
          timestamp
        }
        ... on NodeArticle {
          body {
            processed
            summary
          }
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_ARTICLE_BY_PATH = gql`
  query GetArticleByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeArticle {
            id
            title
            body {
              processed
            }
            created {
              timestamp
            }
            changed {
              timestamp
            }
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM, THUMBNAIL]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    # Get the dedicated homepage content
    nodeHomepages(first: 1) {
      nodes {
        id
        title
        path
        heroTitle
        heroSubtitle
        heroDescription {
          processed
        }
        featuresTitle
        featuresSubtitle {
          processed
        }
        featuresItems {
          ... on ParagraphFeatureItem {
            id
            featureTitle
            featureDescription {
              processed
            }
          }
        }
        ctaTitle
        ctaDescription {
          processed
        }
        ctaPrimary {
          title
          url
        }
        ctaSecondary {
          title
          url
        }
      }
    }
  }
`

export const GET_NODE_BY_PATH = gql`
  query GetNodeByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodePage {
            id
            title
            body {
              processed
            }
          }
          ... on NodeArticle {
            id
            title
            body {
              processed
            }
            created {
              timestamp
            }
            changed {
              timestamp
            }
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM, THUMBNAIL]) {
                name
                url
                width
                height
              }
            }
          }
          ... on NodeHomepage {
            id
            title
            heroTitle
            heroSubtitle
            heroDescription {
              processed
            }
            featuresTitle
            featuresSubtitle {
              processed
            }
            featuresItems {
              ... on ParagraphFeatureItem {
                id
                featureTitle
                featureDescription {
                  processed
                }
              }
            }
            ctaTitle
            ctaDescription {
              processed
            }
            ctaPrimary {
              title
              url
            }
            ctaSecondary {
              title
              url
            }
          }
        }
      }
    }
  }
`

// Coffee Shop Queries
export const GET_MENU_ITEMS = gql`
  query GetMenuItems($first: Int = 50) {
    nodeMenuItems(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeMenuItem {
          body {
            processed
          }
          category
          price
          featured
          itemImage {
            url
            alt
          }
          ingredients
          dietaryInfo
        }
      }
    }
  }
`

export const GET_COFFEE_SHOP_PAGE = gql`
  query GetCoffeeShopPage {
    nodeCoffeeShopPages(first: 1) {
      nodes {
        id
        title
        path
        ... on NodeCoffeeShopPage {
          heroTitle
          heroSubtitle
          heroImage {
            url
            alt
          }
          aboutTitle
          aboutContent {
            processed
          }
          hoursWeekday
          hoursWeekend
          address
          phone
          email
          instagram
        }
      }
    }
  }
`

// University Queries
export const GET_ACADEMIC_PROGRAMS = gql`
  query GetAcademicPrograms($first: Int = 20) {
    nodeAcademicPrograms(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeAcademicProgram {
          body {
            processed
          }
          programType
          department
          duration
          credits
          featured
          programImage {
            url
            alt
          }
          highlights
          careerOutcomes
        }
      }
    }
  }
`

export const GET_FACULTY_MEMBERS = gql`
  query GetFacultyMembers($first: Int = 20) {
    nodeFacultyMembers(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeFacultyMember {
          body {
            processed
          }
          position
          department
          email
          phone
          office
          photo {
            url
            alt
          }
          specializations
          featured
        }
      }
    }
  }
`

export const GET_CAMPUS_EVENTS = gql`
  query GetCampusEvents($first: Int = 10) {
    nodeCampusEvents(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeCampusEvent {
          body {
            processed
          }
          eventDate
          eventTime
          location
          eventType
          eventImage {
            url
            alt
          }
          registrationUrl
          featured
        }
      }
    }
  }
`

export const GET_UNIVERSITY_NEWS = gql`
  query GetUniversityNews($first: Int = 10) {
    nodeUniversityNews(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeUniversityNew {
          body {
            processed
          }
          newsCategory
          newsImage {
            url
            alt
          }
          author
          featured
        }
      }
    }
  }
`

export const GET_UNIVERSITY_PAGE = gql`
  query GetUniversityPage {
    nodeUniversityPages(first: 1) {
      nodes {
        id
        title
        path
        ... on NodeUniversityPage {
          heroTitle
          heroSubtitle
          heroImage {
            url
            alt
          }
          statsStudents
          statsFaculty
          statsPrograms
          statsRanking
          aboutTitle
          aboutContent {
            processed
          }
          missionStatement {
            processed
          }
          ctaApplyUrl
          ctaVisitUrl
          address
          phone
          email
        }
      }
    }
  }
`
