build:
	docker build -t weather .
run:
	docker run -it -d -p 8000:8000 --name weather weather
exec:
	docker exec -it weather /bin/bash
logs:
	docker logs weather
ps:
	docker ps -a
img:
	docker images
rm:
	docker rm -f $$(docker ps -aq)
rmi:
	docker rmi $$(docker images -q)
k8sinit:
	docker commit weather weathers
	docker tag weather wpdlf/weathers
	docker push wpdlf/weathers
	docker rm -f $$(docker -ps -aq)
	docker rmi wpdlf/weathers  # untag
	docker rmi $$(docker images -q)
appdep:
	kubectl apply -f deployment.yaml
appsvc:
	kubectl apply -f service.yaml
getdep:
	kubectl get deployment
getsvc:
	kubectl get svc -o wide
getpod:
	kubectl get pod -o wide
deldep:
	kubectl delete deployment weathers
delsvc:
	kubectl delete svc weathers
