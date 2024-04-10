# Makefile

# 获取当前 git 提交的短版本哈希
VERSION := $(shell git rev-parse --short HEAD)

# 配置变量
SUFFIX ?= local
IMAGE_TAG ?= v0.1.0.1
IMAGE_NAME := vite-ts-element-nginx

# 根据配置计算出的变量
FULL_IMAGE_TAG := $(IMAGE_TAG)-$(SUFFIX)
VITE_TS_ELEMENT_IMAGE := $(IMAGE_NAME):$(FULL_IMAGE_TAG)
CONTAINER_NAME_PROD := $(IMAGE_NAME)-prod-$(SUFFIX)

# 主目标：构建并运行容器
all: build run

# 构建 Docker 镜像
build:
	@echo "检查镜像 $(VITE_TS_ELEMENT_IMAGE) 是否存在..."
	@if ! docker images $(VITE_TS_ELEMENT_IMAGE) | grep -q $(FULL_IMAGE_TAG); then \
		echo "镜像 $(FULL_IMAGE_TAG) 不存在，开始构建..."; \
		docker build --build-arg VERSION=$(VERSION) -t $(VITE_TS_ELEMENT_IMAGE) -f ./docker/Dockerfile.prod .; \
	else \
		echo "镜像 $(FULL_IMAGE_TAG) 已存在，跳过构建步骤。"; \
	fi

# 运行容器
run: build
	@echo "正在停止并移除任何已存在的容器 $(CONTAINER_NAME_PROD)..."
	-docker stop $(CONTAINER_NAME_PROD) > /dev/null 2>&1
	-docker rm $(CONTAINER_NAME_PROD) > /dev/null 2>&1
	@echo "正在运行新容器 $(CONTAINER_NAME_PROD)..."
	docker run -d --name $(CONTAINER_NAME_PROD) -p 30001:80 $(VITE_TS_ELEMENT_IMAGE)

# 停止容器
stop:
	@echo "正在停止容器 $(CONTAINER_NAME_PROD)..."
	-docker stop $(CONTAINER_NAME_PROD)

# 移除容器
rm:
	@echo "正在移除容器 $(CONTAINER_NAME_PROD)..."
	-docker rm $(CONTAINER_NAME_PROD)

# 清理操作：移除构建的镜像
clean:
	@echo "正在移除 Docker 镜像 $(VITE_TS_ELEMENT_IMAGE)..."
	-docker rmi $(VITE_TS_ELEMENT_IMAGE)

.PHONY: all build run stop rm clean
