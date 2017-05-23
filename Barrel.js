var Barrel = function() {
    function _Barrel($ct, imgNum, baseHeight) {
        this.$ct = $ct
        this.ctWidth = $ct.width()
        this.imgNum = imgNum
        this.baseHeight = baseHeight
        this.rowList = []
        this.loadImg()
        this.imgIndex = 0
    }
    _Barrel.prototype.getImgUrls = function(num) { //获取图片的过程。可替换获取的方式
        var width, height, urls = []
        for (let i = 0; i < num; i++) {
            width = Math.floor(Math.random() * 500 + 400)
            height = Math.floor(Math.random() * 500 + 300)
            urls.push(`https://unsplash.it/${width}/${height}`)
        }
        return urls
    }

    _Barrel.prototype.loadImg = function() {
        var urlArr = this.getImgUrls(this.imgNum),
            _this = this

        $.each(urlArr, function(idx, url) {
            var img = new Image(),
                _this = this
            img.src = url
            img.onload = function() {
                var ratio = this.width / this.height
                var imgInfo = {
                    target: img,
                    width: ratio * _this.baseHeight,
                    height: _this.baseHeight
                }
                _this.imgIndex
                _this.renderImg(imgInfo) //没加载一次图片就渲染
                console.log('loadimg')
            }
        })
    }

    _Barrel.prototype.renderImg = function(imgInfo) {
        this.rowList.push(imgInfo)
        var rowWidthSum = 0
        var newRowHeight = 0
        var lastImgInfo = imgInfo
        for (let i = 0; i < this.rowList.length; i++) {
            rowWidthSum += this.rowList[i].width
            if (rowWidthSum > this.ctWidth) {
                rowWidthSum -= lastImgInfo.width
                this.rowList.pop()

                newRowHeight = (this.ctWidth / rowWidthSum) * this.baseHeight
                this.layOut(newRowHeight)

                this.rowList = []
                this.rowList.push(lastImgInfo)
            }
            if (this.imgIndex === imgNum && rowWidthSum < this.ctWidth) {
                newRowHeight = this.baseHeight
                this.layOut(newRowHeight)
            }
        }
    }
    _Barrel.prototype.layOut = function(newRowHeight) {
        var _this = this
        console.log('layout')
        var $rowCt = $('<div class="img-row"></div>')
        $.each(this.rowList, function(idx, item) {
            var $imgCt = $('<div class="img-box"></div>')
            var $img = $(item.target)
            var ratio = item.width / item.height
            var newImgWidth = ratio * newRowHeight
            console.log($img)
            $img.width(newImgWidth)
            $imgCt.append($img)
            $rowCt.append($imgCt)
        })
        this.$ct.append($rowCt)
    }

    return {
        init: function($ct, imgNum, baseHeight) {
            $ct.each(function(idx, node) {
                new _Barrel($(node), imgNum, baseHeight)
            })
        }
    }
}()