variable "azure_resource_suffix" {
  type        = string
  description = "Suffix for Resources created in Azure"
}

variable "azure_context" {
  type    = map(any)
  default = {}
}

variable "extra_tags" {
  type    = map(string)
  default = {}
}