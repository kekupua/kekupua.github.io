/**
 * Created by Sean on 9/24/2017.
 */
Vue.component('mainNav', {
    props: ['navTabs'],
    template:
    `<!-- Navigation -->
    <nav class="Navbar">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="Navbar-header">
            <div class= "Navbar-brand Column--half">
                <a class="brand" href="#page-top">Sean Teramae</a>
            </div>
            <div class="Navbar-tabs Column--half u-text-align-right .u-show-sm">
                <ul class="tabs">
                    <li v-for="tab in navTabs">
                        <a class="page-scroll" v-bind:href="tab.href">{{tab.title}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`
});

const app = new Vue({
    el: '#app',
    data: {
        navTabs:[{
            title: "Skills",
            href: "#skills"
        },{
            title: "Portfolio",
            href: "#portfolio"
        },{
            title: "About",
            href: "#about"
        },{
            title: "Contact",
            href: "#contact"
        }]
    },
    template :
        `<div class= "main">
        <mainNav :navTabs="navTabs" />
        <div class="Container-black">
            <div class="CoverPhoto">
                <div class="CoverPhoto-container">
                    <div class="CoverPhoto-title u-text-align-center">
                        <h1>A Personal Portfolio</h1>
                    </div>
                    <div class="CoverPhoto-cta">
                        <button class="CtaMain">Click</button>
                    </div>                
                </div>
            </div>
        </div>
    </div>`
});



