drop table if exists refresh_token, member, post, comment, post_like, comment_likes;

CREATE TABLE refresh_token
(
    refresh_token_id BIGINT AUTO_INCREMENT NOT NULL,
    member_id        BIGINT                NULL,
    token            VARCHAR(255)          NULL,
    CONSTRAINT pk_refreshtoken PRIMARY KEY (refresh_token_id)
);

CREATE TABLE member
(
    member_id  BIGINT AUTO_INCREMENT NOT NULL,
    created_at datetime              NOT NULL,
    updated_at datetime              NULL,
    role_type  VARCHAR(255)          NULL,
    login_id   VARCHAR(255)          NULL,
    password   VARCHAR(255)          NULL,
    nickname   VARCHAR(255)          NULL,
    profile_image_url VARCHAR(255)   NULL,
    CONSTRAINT pk_member PRIMARY KEY (member_id)
);
ALTER TABLE member
    ADD CONSTRAINT uc_member_nickname UNIQUE (nickname);

CREATE TABLE post
(
    post_id    BIGINT   AUTO_INCREMENT  NOT NULL,
    created_at datetime                 NOT NULL,
    updated_at datetime                 NULL,
    title      VARCHAR(255)             NOT NULL,
    content    LONGTEXT                 NOT NULL,
    main_image_url VARCHAR(255)         NULL,
    view_count INT                      NOT NULL,
    like_count INT                      NOT NULL,
    deleted    BIT(1)                   NULL,
    member_id  BIGINT                   NOT NULL,
    CONSTRAINT pk_post PRIMARY KEY (post_id)
);

ALTER TABLE post
    ADD CONSTRAINT FK_POST_ON_MEMBER FOREIGN KEY (member_id) REFERENCES member (member_id);

CREATE TABLE comment
(
    comment_id   BIGINT AUTO_INCREMENT NOT NULL,
    parent_id    BIGINT                NULL,
    member_id    BIGINT                NULL,
    post_id      BIGINT                NULL,
    nickname     VARCHAR(255)          NULL,
    soft_removed BIT(1)                NOT NULL,
    like_count   INT                   NOT NULL,
    created_at   datetime              NULL,
    message      VARCHAR(255)          NOT NULL,
    CONSTRAINT pk_comment PRIMARY KEY (comment_id)
);

ALTER TABLE comment
    ADD CONSTRAINT FK_COMMENT_ON_MEMBER FOREIGN KEY (member_id) REFERENCES member (member_id);

ALTER TABLE comment
    ADD CONSTRAINT FK_COMMENT_ON_PARENT FOREIGN KEY (parent_id) REFERENCES comment (comment_id);

ALTER TABLE comment
    ADD CONSTRAINT FK_COMMENT_ON_POST FOREIGN KEY (post_id) REFERENCES post (post_id);

CREATE TABLE post_like
(
    post_like_id BIGINT AUTO_INCREMENT NOT NULL,
    created_at   datetime              NOT NULL,
    updated_at   datetime              NULL,
    post_id      BIGINT                NULL,
    member_id    BIGINT                NULL,
    CONSTRAINT pk_postlike PRIMARY KEY (post_like_id)
);

ALTER TABLE post_like
    ADD CONSTRAINT FK_POST_LIKE_ON_MEMBER FOREIGN KEY (member_id) REFERENCES member (member_id);

ALTER TABLE post_like
    ADD CONSTRAINT FK_POST_LIKE_ON_POST FOREIGN KEY (post_id) REFERENCES post (post_id);
CREATE TABLE comment_likes
(
    comment_likes_id BIGINT AUTO_INCREMENT NOT NULL,
    comment_id       BIGINT                NULL,
    member_id        BIGINT                NULL,
    CONSTRAINT pk_comment_likes PRIMARY KEY (comment_likes_id)
);

ALTER TABLE comment_likes
    ADD CONSTRAINT FK_COMMENT_LIKES_ON_COMMENT FOREIGN KEY (comment_id) REFERENCES comment (comment_id);

ALTER TABLE comment_likes
    ADD CONSTRAINT FK_COMMENT_LIKES_ON_MEMBER FOREIGN KEY (member_id) REFERENCES member (member_id);