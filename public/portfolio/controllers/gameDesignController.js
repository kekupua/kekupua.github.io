kekupua.controller('GameDesignController', ['$scope', function($scope){
    $scope.resourceList = [
        {
            projectName: "Cover Letter",
            description: "A whimsical tale of my journey through life.",
            link: "public/resources/Blizzard_Cover_Letter_Game_Design.pdf",
            icon: "file_download"
        },
        {
            projectName: "Card Design",
            description: "A spell designed to make Paladin great again.",
            link: "public/resources/Conscription_CardDesign.pdf",
            icon: "file_download"
        },
        {
            projectName: "Miensfeld",
            description: "One man's journey through a minefield of problems.",
            link: "https://github.com/kekupua/EE-160/tree/master/Homework/final",
            icon: "call_made"
        },
        {
            projectName: '"Tamagotchi"',
            description: "Raise your very own digital pet from an infant to old geezer.",
            link: "https://github.com/kekupua/WDK-Homework/tree/master/Final%20Project",
            icon: "call_made"
        }
    ]

}]);

