let tabs = document.querySelectorAll('.tab'),
    workSection = document.getElementById('ourWork'),
    nav = document.querySelector('nav'),
    navWatch = document.getElementById('navWatch'),
    bottomBorders = document.querySelectorAll('.bottom-border'),
    articleMainImg = document.querySelectorAll('article .main');

export class InterObserver  {
    constructor(){
        this.prevRatio;
        this.options = {
            root: null,
            rootMargin: "0px",
            // threshold: .5
            threshold: this.buildThresholdList()
        };
        this.createObserver(this.handleIntersect, this.options);

    }

    createObserver (handle, options) {

        this.observer = new IntersectionObserver(handle, options);
        for(let i = 0;i < tabs.length;i++){
            let a = tabs[i]
            this.observer.observe(a);
        }

        for(var i = 0;i < bottomBorders.length;i++){
            var border = bottomBorders[i];
            this.observer.observe(border);
        }

        for(var i = 0;i < articleMainImg.length;i++){
            var mainImg = articleMainImg[i];
            this.observer.observe(mainImg);
        }
        this.observer.observe(workSection);
        this.observer.observe(navWatch)
    }

    buildThresholdList () {
        let thresholds = [];
        let numSteps = 20;

        for (let i=1.0; i<=numSteps; i++) {
            let ratio = i/numSteps;
            thresholds.push(ratio);
        }

        thresholds.push(0);
        return thresholds;
    }

    handleIntersect (entries, observer) {

        this.observer = observer;

        entries.forEach((entry) => {
            if (entry.intersectionRatio < .6 && entry.target.classList.contains('main')) {

                entry.target.classList.add('init')


            }else if(entry.intersectionRatio > .6 && entry.target.classList.contains('main')){
                entry.target.classList.remove('init')
            }

            if (entry.intersectionRatio < .6 && entry.target.id == "navWatch") {

                nav.classList.add('fixed-nav')


            }else if(entry.intersectionRatio > .6 && entry.target.id == "navWatch"){
                nav.classList.remove('fixed-nav')
            }

            if (entry.intersectionRatio < .2 && entry.target.classList.contains('bottom-border')) {

                entry.target.classList.remove('anim-border')


            }else if(entry.intersectionRatio > .9  && entry.target.classList.contains('bottom-border')){
                entry.target.classList.add('anim-border')
            }


            if (entry.intersectionRatio > .3 && entry.target.id == "ourWork") {
                console.log(entry.isIntersecting, "inter", entry.target)
                // entry.target.classList.add('returnPos')
                for(var i = 0;i < tabs.length;i++){
                    var tab = tabs[i]
                    tab.classList.add('returnPos')
                }

                //entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
            } else if(entry.intersectionRatio < .3 && entry.target.id == "ourWork") {
                console.log(entry.isIntersecting, "inter", entry.target)
                // entry.target.classList.remove('returnPos')
                for(var i = 0;i < tabs.length;i++){
                    var tab = tabs[i]
                    tab.classList.remove('returnPos')
                }
            }
        });
    }

}

