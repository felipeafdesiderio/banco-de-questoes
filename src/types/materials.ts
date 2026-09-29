export type TopicMaterialType = 'youtube' | 'pdf' | 'external_link' | 'paid_course'

export type TopicMaterial = {
  id: string
  type: TopicMaterialType
  title: string
  url: string
  description?: string
}
