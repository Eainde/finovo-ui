provider "google" {
#  credentials = file("/Users/akshaydipta/Downloads/finovo-466315-0e970e92573f.json")
  project     = var.project
  region      = var.region
}

resource "google_project_service" "run" {
  service = "run.googleapis.com"
}

resource "google_project_service" "artifact_registry" {
  service = "artifactregistry.googleapis.com"
}

# this null_resource will delete any existing service before we try to create a new one
resource "null_resource" "delete_old_run_service" {
  triggers = {
    service_name = var.service_name
    project      = var.project
    region       = var.region
  }

  provisioner "local-exec" {
    command = <<-EOT
      if gcloud run services describe ${var.service_name} \
         --project=${var.project} --region=${var.region} &> /dev/null; then
        gcloud run services delete ${var.service_name} \
          --project=${var.project} --region=${var.region} --quiet
      fi
    EOT
  }
}

resource "google_cloud_run_service" "default" {
  # force deletion of old service first
  depends_on = [
    null_resource.delete_old_run_service,
    google_project_service.run,
    google_project_service.artifact_registry,
  ]
  name     = var.service_name
  location = var.region

  template {
    metadata {
      annotations = {
        "deploymentTimestamp" = timestamp()
      }
    }
    spec {
      timeout_seconds = 300

      containers {
        image = var.image_url
        resources {
          limits = {
            memory = "512Mi"
            cpu    = "1"
          }
        }
        ports {
          container_port = 8080
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Allow unauthenticated invocations (public URL)
resource "google_cloud_run_service_iam_member" "invoker" {
  location = google_cloud_run_service.default.location
  project  = var.project
  service  = google_cloud_run_service.default.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
