import json

from sqlalchemy.dialects.postgresql import insert

from src.models import Blog, Tag, blog_tags

from .base_seeder import BaseSeeder


class BlogSeeder(BaseSeeder):
    def run(self):
        with open(
            file="database/seeders/fixtures/blogs.json", mode="r", encoding="utf-8"
        ) as f:
            blogs_data = json.load(f)

        # Seed tags from blog categories
        categories = {blog["category"] for blog in blogs_data}
        tag_insert_stmt = insert(Tag).values(
            [{"name": category} for category in categories]
        )
        tag_do_update_stmt = tag_insert_stmt.on_conflict_do_nothing(
            index_elements=["name"]
        )
        self._session.execute(tag_do_update_stmt)
        self._session.commit()
        print(f"✅ Upserted {len(categories)} tags from blogs")

        # Seed blogs
        blog_values = [
            {
                "title": blog.get("title"),
                "publish_date": blog.get("date"),
                "image": blog.get("cover"),
                "overview": blog.get("excerpt"),
                "description": blog.get("body"),
            }
            for blog in blogs_data
        ]

        blog_insert_stmt = insert(Blog).values(blog_values)
        blog_do_update_stmt = blog_insert_stmt.on_conflict_do_update(
            index_elements=["title"],
            set_={
                "publish_date": blog_insert_stmt.excluded.publish_date,
                "image": blog_insert_stmt.excluded.image,
                "overview": blog_insert_stmt.excluded.overview,
                "description": blog_insert_stmt.excluded.description,
            },
        )
        self._session.execute(blog_do_update_stmt)
        self._session.commit()
        print(f"✅ Upserted {len(blogs_data)} blogs successfully!")

        # Associate blogs with tags
        blogs_from_db = self._session.query(Blog).all()
        blog_map = {blog.title: blog.id for blog in blogs_from_db}
        tags_from_db = self._session.query(Tag).all()
        tag_map = {tag.name: tag.id for tag in tags_from_db}

        blog_tag_values = []
        for blog in blogs_data:
            blog_id = blog_map.get(blog["title"])
            tag_id = tag_map.get(blog["category"])
            if blog_id and tag_id:
                blog_tag_values.append({"blog_id": blog_id, "tag_id": tag_id})

        if blog_tag_values:
            blog_tag_insert_stmt = insert(blog_tags).values(blog_tag_values)
            blog_tag_do_update_stmt = blog_tag_insert_stmt.on_conflict_do_nothing(
                index_elements=["blog_id", "tag_id"]
            )
            self._session.execute(blog_tag_do_update_stmt)
            self._session.commit()
            print(f"✅ Associated {len(blog_tag_values)} blogs with tags")
