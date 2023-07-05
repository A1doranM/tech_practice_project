#cd "$(dirname "$0")"
#openssl genrsa -out key.pem 3072
#openssl req -new -out self.pem -key key.pem -subj "/CN=localhost"
#openssl req -text -noout -in self.pem
#openssl x509 -req -days 1024 -in self.pem -signkey key.pem -out cert.pem -extfile generate.ext

openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj "/CN=localhost" \
  -keyout localhost-privkey.pem -out localhost-cert.pem
