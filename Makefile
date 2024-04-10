# 定义变量
IMAGE_NAME=vite-ts-element-nginx

# 默认目标
all: build run

# 构建 Docker 镜像
build:
	docker build -f ./docker/Dockerfile.prod -t $(IMAGE_NAME) .

# 运行 Docker 容器
run:
	docker run -d -p 30001:80 $(IMAGE_NAME)

# 停止并移除 Docker 容器
stop:
	docker stop $(IMAGE_NAME)
	docker rm $(IMAGE_NAME)

# 清理操作，比如移除构建的镜像
clean:
	docker rmi $(IMAGE_NAME)

.PHONY: all build run stop clean
