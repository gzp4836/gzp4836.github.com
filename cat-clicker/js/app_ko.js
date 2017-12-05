var catData = [
    {
        name: 'cat1',
        img: 'img/cat_picture1.jpeg',
        clickNum: 0
    }, {
        name: 'cat2',
        img: 'img/cat_picture2.jpeg',
        clickNum: 0
    }, {
        name: 'cat3',
        img: 'img/cat_picture3.jpeg',
        clickNum: 0
    }, {
        name: 'cat4',
        img: 'img/cat_picture4.jpeg',
        clickNum: 0
    }
];
var Cat = function (data) {
    var self = this;
    this.name = ko.observable(data.name);
    this.clickCount = ko.observable(data.clickNum);
    this.imgSrc = ko.observable(data.img);
    this.level = ko.computed(function () {
        var clicks = self.clickCount();
        if (clicks < 10) {
            return "ge";
        } else if (clicks < 20) {
            return "shi";
        } else if (clicks < 30) {
            return "er shi";
        } else {
            return "san shi";
        }
    })
}
var ViewModel = function () {
    var self = this;
    this.catList = ko.observableArray([]);
    catData.forEach(function (item) {
        self.catList.push(new Cat(item));
    })
    this.currentCat = ko.observable(this.catList()[0]);
    this.incrementCounter = function () {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1)
    }
    this.setCat = function (cat) {
        //todo get cat data and render
        self.currentCat(cat);
    }
}
ko.applyBindings(new ViewModel());
