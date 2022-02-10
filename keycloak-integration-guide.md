# Hướng dẫn tích hợp Keycloak

## Nội dung

1. [Lời mở đầu](#loi-mo-dau)
2. [Cơ chế xác thực](#co-che-xac-thuc)
3. [Các khái niệm trong keycloak](#khai-niem-trong-keycloak)
4. [Tích hợp với React App](#tich-hop-voi-react-app)
5. [Tích hợp với Nodejs App](#tich-hop-voi-nodejs-app)
6. [Hướng dẫn sử dụng các tính năng cần thiết trong keycloak](#huong-dan-su-dung-cac-tinh-nang-can-thiet-trong-keycloak)
7. [Tích hợp với Mobile App](#tich-hop-voi-mobile-app)
8. [Authorization](#authorization)

## 1. Lời mở đầu

**[Keycloak](keycloak.org)** là một sản phẩm phần mềm mã nguồn mở cho phép đăng nhập một lần (IdP) với Quản lý danh tính và Quản lý truy cập cho các ứng dụng và dịch vụ hiện đại. Phần mềm này được viết bằng Java và hỗ trợ các giao thức liên kết danh tính theo mặc định SAML v2 và OpenID Connect (OIDC) / OAuth2. Nó được cấp phép bởi Apache và được hỗ trợ bởi Red Hat.



## 2. Cơ chế xác thực

Trước khi tích hợp Keycloak vào các service của bạn, bạn cần hiểu cơ chế xác thực.
<br/>
**Luồng đăng nhập**

![Luồng đăng nhập](https://user-images.githubusercontent.com/57671384/143728831-82fbcd25-8f23-401f-9201-7b2d633e64b6.png)

1. User truy cập vào ứng dụng qua `FE app 1`.
2. `FE app 1` khởi tạo object Keycloak bằng việc gửi 1 request init lên keycloak server (KS).
3. Nếu chưa login, ứng dụng sẽ được chuyển hướng tới trang login của KS.
4. User nhập thông tin đăng nhập.
5. Đăng nhập thành công, keyloak chuyển hướng về `FE app 1` kèm theo `code` dùng 1 lần để trao đổi token.
6. `FE app 1` thực hiện request lên KS kèm theo `code` để lấy token.
7. KS trả về access_token, refresh_token, id_token, expire_time,...
8. `FE app 1` lưu token vào cookie storage của web browser.
9. `FE app 1` dùng token để truy cập vào các tài nguyên phía BE.
10. User truy cập vào `FE app 2` qua browser.
11. Khởi tạo keycloak và get token lần đầu tương tự với `FE app 1`.
12. KS trả về token.
13. `FE app 2` lưu token vào cookie storage.

**Luồng phân xác thực và phân quyền**

## 3. Các khái niệm trong keycloak

#### **Clients**
Client là các thực thể có thể yêu cầu Keycloak xác thực người dùng. Thông thường thì client ở đây là các ứng dụng (application) hoặc dịch vụ (service).

#### **Client access type**
- Public: 
  - Không có cơ chế bảo mật với secret client.
  - Giới hạn truy cập thông qua redirect_uri.
  - Dùng cho client side để cho user đăng ký, đăng nhập, lấy access token.

- Confidential
  - Sử dụng secret client để yêu cầu đăng nhập, trao đổi token.
  - Keycloak khuyến khích dùng chế độ này.
  - Dùng cho server side (Các service phía backend).

- Bearer only
  - Client chỉ cho phép xác thực qua Bearer only.
  - Rất ít khi sử dụng.
  - Dùng cho server side.


#### **Realms**
Realm quản lý một tập hợp users, credential, role và group. Các realm không thể giao tiếp được với nhau.
<br/>
Keycloak có 1 realm mặc định là **master** chứa admin account ban đầu và có thể thực hiện quản lý, tạo các account admin khác. Từ đó mới có thể tạo Realm mới để sử dụng.
Xem cách tạo realm ở [đây](https://www.keycloak.org/docs/latest/server_admin/#_create-realm).

Để biết thêm thông tin về các khái niệm, xem tại [đây](https://www.keycloak.org/docs/latest/server_admin/#core-concepts-and-terms).

#### **Authorization Services**


## 4. Tích hợp với React app

### 1.Authentication
Cài đặt thêm 2 thư viện [@react-keycloak/web](https://www.npmjs.com/package/@react-keycloak/web) và [keycloak-js](https://www.npmjs.com/package/keycloak-js).

#### Ở file App.jsx
```javascript
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'login-required', // or check-sso
        refreshToken,
      }}
      onTokens={handleReceivingTokens}
    >
      // Provider
      // Children
    </ReactKeycloakProvider>
```

#### Trong boiler project, chú ý các phần `router`, `service/auth`,  


## 5. Tích hợp với Nodejs App

## 6. Tích hợp với mobile app

### Token exchange với Identity Providers (Google, Facebook)

Khi thực hiện đăng nhập trên mobile, cần sử dụng tính năng `Token exchange` của Keycloak.

Khi user chưa tồn tại tài khoản trên keycloak, nhưng thực hiện login trên mobile bằng fb hoặc gg thì:
	event: TOKEN_EXCHANGE sẽ dk bắn => ko có event register.. nên account service sẽ k xử 	lý để sync user data
  => giải pháp: Khi có event TOKEN_EXCHANGE xảy ra, xử lý đổi event_type thành LOGIN và bắn webhook về account service.
	
> Khi thực hiện TOKEN_EXCHANGE: cần kiểm tra xem đã config client policy trên identity provider của Facebook hoặc Google chưa.

### Các bước thiết lập quyền Token Exchange cho client.
1. Chọn Identity Provider cần thiết lập
2. tab Permissions => ON => token-exchange
3. Create Policy => chọn `Client`
4. Chọn client tương ứng với app mà muốn exchange token => save
5. Save.


### Token exchange với Apple
#### Config
1. Identity Providers => Add provider...
2. Chọn `OpenID Connect v1.0`
3. Alias => **apple**
4. Hide on Login Page = `true`
5. Authorization URL: `https://appleid.apple.com/auth/authorize?response_mode=form_post`
6. Token URL: `https://appleid.apple.com/auth/token`
> Thực ra bước 5 và 6 chỉ sử dụng khi đăng nhập trên web, nhưng cứ điền vào vì trường này không được để trống.
7. Client Authentication: chọn `Client secret send as basic auth
8. Client ID: điền service ID của phía apple, nhưng vì không login với web nên là điền gì cũng được. Ví dụ: `hello`.
9. Client Secret: lý do tương tự bước 8, điền gì cũng được. Ví dụ: `world`.
10. Issuer: `https://appleid.apple.com`.
11. Validate Signatures: `true`.
12. Use JWKS URL: `true`.
13. JWKS URL: `https://appleid.apple.com/auth/keys`.

14. Save.

## 7. Hướng dẫn sử dụng các tính năng cần thiết trong keycloak

### 1. Tạo Realm
Keycloak có 1 realm mặc định là **master** chứa admin account ban đầu và có thể thực hiện quản lý, tạo các account admin khác. Từ đó mới có thể tạo Realm mới để sử dụng.

### 2. Lấy tokens qua api

Trong Keycloak có 2 đối tượng có thể lấy tokens sử dụng để truy cập vào các tài nguyên là `user` và `client`.

- Lấy tokens cho user
```sh
curl --location --request POST 'http://localhost:8080/auth/realms/${your-realm-name}/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=admin-cli' \
--data-urlencode 'username=${username or email}' \
--data-urlencode 'password=${password}' \
--data-urlencode 'grant_type=password'

```

- Lấy tokens cho client
```sh
curl --location --request POST 'http://localhost:8080/auth/realms/${your-realm-name}/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=${your-client-id}' \
--data-urlencode 'client_secret=${your-client-secret}' \
--data-urlencode 'grant_type=client_credentials'
```

Để 1 client đủ điều kiện lấy tokens thông qua API này thì client cần phải có `access_type` là `confidential` và trên giao diện console cần bật chế độ `Direct-access-grant`.
</br>
</br>
![direct-access-grant](/doc/images/direct-access-grant.png)

### 2. Gọi Admin REST API

Link tra cứu các Admin REST API 
- https://www.keycloak.org/docs-api/15.0/rest-api/
- https://github.com/keycloak/keycloak-nodejs-admin-client#supported-apis
</br>

Ta có thể dùng thực hiện các api bằng tokens sinh bởi `user` hoặc `client`.

### 2. Client tự tạo quản lý bằng Admin REST API.

1. Xem các phần trên để có thể lấy được accessToken cho client.

2. Ta cần cấp quyền cho cho client có thể quản lý chính nó. Trên giao diện console, vào phần `Permissions` của Clients và bật tính năng này lên. Sau đó chọn `manage`.

![image](/doc/images/permission-client.png)

3. Sau khi chọn manage, màn hình như hình dưới hiển thị. chọn `Create Policy => Client`.
![image](/doc/images/manage-client.png)

4. Đặt tên `client policy` như hình hoặc theo ý bạn. Ở phần **Client** bạn chọn đúng tên client cài đặt, Ở đây mình đang cài đặt cho client `Service1` có thể tự quản lý nó thông qua REST API. 
![image](/doc/images/client-manage-itself.png).

5. Bấm **Lưu** (quan trọng).

6. Gọi REST API

Dưới đây là demo client tự tạo role cho nó.

```sh
curl --location --request POST 'http://localhost:8080/auth/admin/realms/${your-realm-name}/clients/${id}/roles' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "role-name"
}'
```
Đọc mô tả chi tiết api tạo **role** tại [đây](https://www.keycloak.org/docs-api/15.0/rest-api/#_roles_resource).
> Lưu ý: **id** ở trên là id của client trong Database chứ k phải clientId mà ta vẫn hay sử dụng.

Có thể lấy được id này bằng cách gọi Admin REST API lấy danh sách clients của realm:

```sh
curl --location --request GET 'http://localhost:8080/auth/admin/realms/myRealm/clients' \
--header 'Authorization: Bearer ...'
```

### 2. Client mapping role của client vào user
1. Client cần có role manage-users từ `realm-management` => test lại chỗ này.
2. Client cần có quyền 

### 2. Mapper user attribute vào tokens.

### 3.  Quản lý Session và access token

#### Trong phần `Tokens` của realm settings:
  SSO Session Idle: Nếu 1 user không hoạt động trong một thời gian timeout, session của user này sẽ mất hiệu lực.

#### Viết script mapper.

mapper là tính năng cho phép admin ánh xạ dữ liệu của user vào trong tokens.

Trong scripts, chúng ta có thể gọi ra các object đã được keycloak binding:
```java
    claimValue = script.eval((bindings) -> {
      bindings.put("user", user);
      bindings.put("realm", realm);
      bindings.put("token", token);
      bindings.put("userSession", userSession);
      bindings.put("keycloakSession", keycloakSession);
    });
```
> chi tiết xem tại [đây](https://github.com/keycloak/keycloak/blob/2a4cee60440be6767e0f1e9155cebfa381cfb776/services/src/main/java/org/keycloak/protocol/oidc/mappers/ScriptBasedOIDCProtocolMapper.java#L143).

Các method trong các object [`user`](https://github.com/keycloak/keycloak/blob/main/server-spi/src/main/java/org/keycloak/models/UserModel.java), [`realm`](https://github.com/keycloak/keycloak/blob/main/server-spi/src/main/java/org/keycloak/models/RealmModel.java), , [`userSession`](https://github.com/keycloak/keycloak/blob/main/server-spi/src/main/java/org/keycloak/models/UserSessionModel.java), [`keycloakSession`](https://github.com/keycloak/keycloak/blob/main/server-spi/src/main/java/org/keycloak/models/KeycloakSession.java) có thể tìm thấy trong các Model tương ứng của java class.

Dưới đây là đoạn code thực hiện mapping các attribute của user (avatar, phone number), địa chỉ ip khi đăng nhập của user vào trong token.
```javascript
var ipAddress = userSession.getIpAddress();
var phoneNumber = user.getFirstAttribute('phoneNumber');
var avatar = user.getFirstAttribute('avatar');

// map value to token claims
token.getOtherClaims().put("ip_address", ipAddress);
token.getOtherClaims().put("phone_number", phoneNumber);
token.getOtherClaims().put("avatar", avatar);
```
**Triển khai**
Trong thư mục `main/resources` cấu trúc file như sau:
```
  /resources
    |-- META-INF
    |   |-- keycloak-scripts.json // file config để deploy scripts
    |   |-- keycloak-themes.json
    |-- theme
    |-- theme-resources
    |-- vbee-mapper.js // file script mapper
```

Nội dung file `keycloak-scripts.json`:
```json
{
    "authenticators": [
        {
            "name": "My Authenticator",
            "fileName": "my-script-authenticator.js",
            "description": "My Authenticator from a JS file"
        }
    ],
    "policies": [
        {
            "name": "My Policy",
            "fileName": "my-script-policy.js",
            "description": "My Policy from a JS file"
        }
    ],
    "mappers": [
        {
            "name": "My Mapper",
            "fileName": "my-script-mapper.js",
            "description": "My Mapper from a JS file"
        }
    ]
}
```

Để biết thêm chi tiết xem tại [đây](https://www.keycloak.org/docs/latest/server_development/#_script_providers).


## Build image từ resource gốc của keycloak repository.
Trong trường hợp không có cách tùy chỉnh, mở rộng các Provider mà keycloak cung cấp và cần thay đổi trực tiếp 1 đoạn code nào đó từ source code của keycloak thì lúc này, cần phải build lên một image gốc riêng.
1. Clone source code của keycloak
```
git clone https://github.com/keycloak/keycloak.git
cd keycloak
```
2. build server run:
```
mvn -Pdistribution -pl distribution/server-dist -am -Dmaven.test.skip clean install
```

3. Khi build xong, file build `tar.gz` sẽ có đường dẫn `/distribution/server-dist/target/keycloak-<VERSION>.tar.gz`.

4. Clone repo tạo keycloak image về máy

```
https://github.com/keycloak/keycloak-containers
cd keycloak-containers
```

5. Di chuyển vào trong thư mục `server` và chỉnh sửa `Dockerfile`.
```
cd server
vim Dockerfile
```

Sửa giá trị của dòng `ARG KEYCLOAK_DIST=` với đường dẫn tới nơi có chứa file build `keycloak-<VERSION>.tar.gz`. Lưu ý chỗ này không thể dùng relative path mà cần dùng 1 server để đọc được file. Chẳng hạn:
```
ARG KEYCLOAK_DIST=http://192.168.1.116:3001/keycloak-16.1.0.tar.gz
```
6. Build image
```
docker build -t <tag_image>:<version> .
```

**Build Keycloak-vbee**
<br/>
Sau khi có một image gốc mới, tạm gọi là `customized-keycloak:16.1.0 image`, trong file `Dockerfile` của IAM, cần sửa tên của image ở staged 3 theo đúng image tag.

```Dockerfile
FROM node:12-alpine as build-tailwind
.
.
...

FROM jboss/keycloak:16.1.0 // Sửa ở đây: customized-keycloak:16.1.0
COPY --from=build-maven app/target/keycloak-providers-1.0-SNAPSHOT.jar /opt/jboss/keycloak/standalone/deployments/
COPY profile.properties /opt/jboss/keycloak/standalone/configuration/
WORKDIR /opt/jboss/keycloak
```

### Tích hợp Identity Providers (Facebook, Google)

#### Facebook
##### Lưu ý:
- `Additional user's profile fields`: picture
- `Default Scopes`: public_profile,email

#### Api update profile từ account-service: PUT /api/v1/me
>NOTE: nếu có lỗi `unknown` từ phía IAM thì kiểm tra lại:
1. client vbee-tts-account đã bật chế độ Service Account Role hay chưa??
nếu chưa thì vào tab `Settings` của client vbee-tts-account => `Service Accounts Enabled` => true => Save. Sau đó đọc note 2.

2. Kiểm tra client vbee-tts-account đã được cấp role **manage-users** của client `realm-management` hay chưa.
Nếu chưa thì vào tab `Service Account Roles` của client vbee-tts-account => Client Roles => chọn `realm-management` => assigned-role chọn `manage-users`.

## Authorization

### Registration
Vbee custom luồng đăng ký của Keycloak, không cho người dùng nhập vào `username` (là field required của Keycloak), vì thế cần tạo một flow Đăng ký khác, khi người dùng nhập đầy đủ thông tin, `username` sẽ tự động được gán bằng `email`. Ngoài ra, bản tùy chỉnh `Authorization Registration` này cũng có thêm `required unique phoneNumber` (Số điện thoại bắt buộc user phải nhập và là duy nhất).

1. Vào mục Authorization của Realm
2. Chọn flow Registration
3. Copy => đặt tên, ví dụ: Vbee Registration
4. Ở phần Vbee Registration Form chọn Actions => Add execution => Provider: Vbee Registration User Validation
5. Xóa bỏ Registration User Validation ở đầu tiên, và đưa cái cuối cùng lên như hình(nhớ bật required).
![Vbee-registration](/doc/images/Vbee-registration.png)
6. Vào phần Bindings
7. Ở phần Registration Flow chọn Vbee Registration
![vbee-binding](/doc/images/Bindings.png)
8. Save


### Login
Vbee khi chuyển từ V3 lên V4 cần thực hiện đồng bộ user. Đồng bộ theo cách là khi 1 user nhập `email hoặc số điện thoại` thì sẽ gọi api về  `service account` để kiểm tra và đồng bộ thông tin user và password. Api trả về  `200 OK` thì tức sẽ tiếp tục luồng đăng nhập, nếu không thì sẽ bắn ra lỗi tài khoản không hợp lệ.
Để kích hoạt luồng đăng nhập đồng bộ V3 này, cần config theo các bước dưới đây:
1. Vào mục Authorization của Realm
2. Chọn flow `Browser`
3. Copy => đặt tên, ví dụ: `Vbee Browser`
4. Ở phần `Vbee Browser Form` chọn Actions => Add execution => Provider: `Vbee Username Password Form`
5. Xóa bỏ 2 execution ở giữa để  được như hình dưới.
![Vbee-browser](/doc/images/Vbee-browser.png)
6. Vào tab Bindings.
7. Ở phần `Browser Flow` chọn `Vbee Browser`.
![vbee-binding](/doc/images/Bindings.png)
8. Save

> Lưu ý: khi triển khai phần này cần chú ý biến môi trường `VBEE_TTS_CLIENT`, biến này có value là `clientId` của crm frontend service.

> Lưu ý: Mã nguồn của phần custom Flow Login này không tồn tại ở `IAM repository` do có 1 số class khi extends để tạo Provider cho phần `Username Password Form` đã bị Keycloak chặn không cho import khi deploy file .jar vào trong môi trường của keycloak. Do đó Team đã code trực tiếp vào core keycloak và build image lên như giải thích ở phần `Build image từ resource gốc của keycloak repository.`