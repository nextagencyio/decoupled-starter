export interface DrupalNode {
  id: string
  title: string
  path: string
  created: {
    timestamp: number
  }
  changed: {
    timestamp: number
  }
}

export interface DrupalArticle extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  image?: {
    url: string
    alt?: string
    width?: number
    height?: number
    variations?: Array<{
      name: string
      url: string
      width: number
      height: number
    }>
  }
}

export interface ArticleTeaserData {
  nodeArticles: {
    nodes: DrupalArticle[]
  }
}

export interface DrupalPage extends DrupalNode {
  body?: {
    processed: string
  }
}

export interface DrupalHomepage extends DrupalNode {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: {
    processed: string
  }
  featuresTitle?: string
  featuresSubtitle?: {
    processed: string
  }
  featuresItems?: DrupalFeature[]
  ctaTitle?: string
  ctaDescription?: {
    processed: string
  }
  ctaPrimary?: {
    title: string
    url: string
  }
  ctaSecondary?: {
    title: string
    url: string
  }
}

export interface DrupalFeature {
  id: string
  featureTitle: string
  featureDescription?: {
    processed: string
  }
  icon?: string
}

export interface HomepageData {
  nodeHomepages: {
    nodes: DrupalHomepage[]
  }
}

// Feature color type
export type FeatureColor = 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'indigo'

// Coffee Shop Types
export interface DrupalMenuItem extends DrupalNode {
  body?: {
    processed: string
  }
  category?: string
  price?: string
  featured?: boolean
  itemImage?: {
    url: string
    alt?: string
  }
  ingredients?: string[]
  dietaryInfo?: string[]
}

export interface DrupalCoffeeShopPage extends DrupalNode {
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: {
    url: string
    alt?: string
  }
  aboutTitle?: string
  aboutContent?: {
    processed: string
  }
  hoursWeekday?: string
  hoursWeekend?: string
  address?: string
  phone?: string
  email?: string
  instagram?: string
}

export interface MenuItemsData {
  nodeMenuItems: {
    nodes: DrupalMenuItem[]
  }
}

export interface CoffeeShopPageData {
  nodeCoffeeShopPages: {
    nodes: DrupalCoffeeShopPage[]
  }
}

// University Types
export interface DrupalAcademicProgram extends DrupalNode {
  body?: {
    processed: string
  }
  programType?: string
  department?: string
  duration?: string
  credits?: string
  featured?: boolean
  programImage?: {
    url: string
    alt?: string
  }
  highlights?: string[]
  careerOutcomes?: string[]
}

export interface DrupalFacultyMember extends DrupalNode {
  body?: {
    processed: string
  }
  position?: string
  department?: string
  email?: string
  phone?: string
  office?: string
  photo?: {
    url: string
    alt?: string
  }
  specializations?: string[]
  featured?: boolean
}

export interface DrupalCampusEvent extends DrupalNode {
  body?: {
    processed: string
  }
  eventDate?: string
  eventTime?: string
  location?: string
  eventType?: string
  eventImage?: {
    url: string
    alt?: string
  }
  registrationUrl?: string
  featured?: boolean
}

export interface DrupalUniversityNews extends DrupalNode {
  body?: {
    processed: string
  }
  newsCategory?: string
  newsImage?: {
    url: string
    alt?: string
  }
  author?: string
  featured?: boolean
}

export interface DrupalUniversityPage extends DrupalNode {
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: {
    url: string
    alt?: string
  }
  statsStudents?: string
  statsFaculty?: string
  statsPrograms?: string
  statsRanking?: string
  aboutTitle?: string
  aboutContent?: {
    processed: string
  }
  missionStatement?: {
    processed: string
  }
  ctaApplyUrl?: string
  ctaVisitUrl?: string
  address?: string
  phone?: string
  email?: string
}

export interface AcademicProgramsData {
  nodeAcademicPrograms: {
    nodes: DrupalAcademicProgram[]
  }
}

export interface FacultyMembersData {
  nodeFacultyMembers: {
    nodes: DrupalFacultyMember[]
  }
}

export interface CampusEventsData {
  nodeCampusEvents: {
    nodes: DrupalCampusEvent[]
  }
}

export interface UniversityNewsData {
  nodeUniversityNews: {
    nodes: DrupalUniversityNews[]
  }
}

export interface UniversityPageData {
  nodeUniversityPages: {
    nodes: DrupalUniversityPage[]
  }
}