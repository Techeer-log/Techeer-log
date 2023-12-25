package consolelog.post.repository;

import consolelog.post.domain.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Override
    Optional<Post> findById(Long id);

    @Query("SELECT p FROM Post p WHERE p.id < :lastPostId ORDER BY p.id DESC")
    Slice<Post> findPostByIdIsLessThanOrderByIdDesc(@Param("lastPostId") Long maxId, Pageable pageable);

    default Slice<Post> findNextPage(Pageable pageable) {
        long lastPostId = findMaxId() + 1;
        if (lastPostId == 1) {
            return null; // No data available
        }
        return findPostByIdIsLessThanOrderByIdDesc(lastPostId, pageable);
    }

    @Query("SELECT MAX(p.id) FROM Post p")
    Long findMaxId();

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE post SET like_count = like_count + 1 WHERE post_id = :postId", nativeQuery = true)
    void increaseLikeCount(@Param("postId") Long postId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE post SET like_count = like_count - 1 WHERE post_id = :postId", nativeQuery = true)
    void decreaseLikeCount(@Param("postId") Long postId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE post SET view_count = view_count + 1 WHERE post_id = :postId", nativeQuery = true)
    void updateViewCount(@Param("postId") Long postId);
}
