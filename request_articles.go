package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/mozillazg/go-slugify"
)

type Image struct {
	Id                                                                                    int
	Name, Hash, Sha256, Ext, Mime, Size, Url, Provider, Public_id, Created_at, Updated_at string
}

type Category struct {
	Id                           int
	Name, Created_at, Updated_at string
}

type Article struct {
	Id                                                  int
	Title, Content, Description, Created_at, Updated_at string
	Publico                                             bool
	Image                                               Image
	Categories                                          []Category
}

var apiBaseUrl = "https://enbonnet-cms.herokuapp.com/"
var allPost = "articles?_sort=created_at:desc"
var baseDir = "./content"
var articleRoute = baseDir + "/article"

func write_article_file(file *os.File, article *Article) {
	w := bufio.NewWriter(file)
	w.WriteString("---")
	w.WriteByte('\n')
	w.WriteString("title: " + "\"" + article.Title + "\"")
	w.WriteByte('\n')
	w.WriteString("date: " + article.Created_at)
	w.WriteByte('\n')
	w.WriteString("featured_image: " + article.Image.Url)
	w.WriteByte('\n')
	w.WriteString("summary: " + article.Description)
	w.WriteByte('\n')
	w.WriteString("draft: " + strconv.FormatBool(!article.Publico))
	w.WriteByte('\n')
	w.WriteString("---")
	w.WriteByte('\n')
	w.WriteString(article.Content)
	w.Flush()
}

func main() {
	errRmv := os.RemoveAll(articleRoute)
	if errRmv != nil {
		log.Fatal(errRmv)
	}

	res, err := http.Get(apiBaseUrl + allPost)
	if err != nil {
		log.Fatal(err)
	}

	resData, _ := ioutil.ReadAll(res.Body)
	res.Body.Close()

	isValid := json.Valid(resData)
	if !isValid {
		log.Fatal("Invalid data source")
	}

	var articles []Article
	json.Unmarshal(resData, &articles)

	for _, article := range articles {
		fmt.Printf("🚀  %s\n", article.Title)
		artId := strconv.Itoa(article.Id)
		artDir := articleRoute + "/" + artId
		errMdr := os.MkdirAll(artDir, 0755)
		if errMdr != nil {
			log.Fatal(errMdr)
		}

		var fileName = slugify.Slugify(article.Title)
		file, errCreate := os.Create(artDir + "/" + fileName + ".md")
		if errCreate != nil {
			log.Fatal((errCreate))
		}

		write_article_file(file, &article)
	}
}
