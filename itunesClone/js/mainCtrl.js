app.controller('mainCtrl', function($scope, itunesService) {
      $scope.defaultInfo = {
        search: '',
        mediaType: 'all',
        sortBy: 'artistName'
      };

      $scope.sortInfo = $scope.defaultInfo.sortBy;

      $scope.getSongData = function() {
        itunesService.getArtist($scope.artist).then(function(res) {
          $scope.songData = res.data.results.map(function(element) {
            return {
              AlbumArt: element.artworkUrl60,
              Artist: element.artistName,
              Collection: element.collectionName,
              CollectionPrice: element.collectionPrice,
              Play: element.previewUrl,
              Type: element.kind
            };
          });
        });
      };

  $scope.gridOptions = {
      data: 'songData',
      height: '110px',
      sortInfo: {fields: ['Song', 'Artist', 'Collection', 'Type'], directions: ['asc']},
      columnDefs: [
        {field: 'Play', displayName: 'Play', width: '40px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="{{row.getProperty(col.field)}}"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png"></a></div>'},
        {field: 'Artist', displayName: 'Artist'},
        {field: 'Collection', displayName: 'Collection'},
        {field: 'AlbumArt', displayName: 'Album Art', width: '110px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><img src="{{row.getProperty(col.field)}}"></div>'},
        {field: 'Type', displayName: 'Type'},
        {field: 'CollectionPrice', displayName: 'Collection Price in U.S. Dollars'},
      ]
  };

});
