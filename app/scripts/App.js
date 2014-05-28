define(['jquery', 'underscore', 'backbone', 'moment', 'fastclick',
        './Player', './PlayerCollection', './PlayerView', './Expression', './ExpressionView',
        './ButtonView', './Timer', './TimerView', './Undos', './Notes', './NotesView',
        'BlackWindow', 'BlackWindowView', './fitText', './resizeNotesGradient'],
function($, _, Backbone, moment, FastClick,
         Player, PlayerCollection, PlayerView, Expression, ExpressionView,
         ButtonView, Timer, TimerView, Undos, Notes, NotesView,
         BlackWindow, BlackWindowView, fitText, resizeNotesGradient) {

    'use strict';

    var App = Backbone.Model.extend({

        defaults: function () {
            return {
                expressionEvaluationMode: false
            };
        },

        initialize: function () {

            var player0 = new Player({
                playerId: 0, // TODO: Remove these?
                id: 'player-0',
                selected: true
            });

            var player1 = new Player({
                playerId: 1,
                id: 'player-1'
            });

            new PlayerView({
                model: player0,
                el: '#yc-player-0'
            });

            new PlayerView({
                model: player1,
                el: '#yc-player-1'
            });

            var players = new PlayerCollection([player0, player1]);

            var expression = new Expression({
                players: players
            });

            new ExpressionView({
                model: expression,
                el: '#yc-expression'
            });

            var timer = new Timer({
                id: 'timer'
            });

            new TimerView({
                model: timer,
                el: '#yc-timer'
            });

            var undos = new Undos({
                id: 'undos',
                players: players,
                timer: timer
            });

            var notes = new Notes({
                id: 'notes'
            });

            var notesView = new NotesView({
                model: notes,
                el: '.yc-notes-window'
            });

            var blackWindow = new BlackWindow();

            var blackWindowView = new BlackWindowView({
                el: '.yc-window',
                model: blackWindow,
                subViews: {
                    notes: notesView//,
                    //history: historyView,
                    //ruling: rulingView,
                    //random: randomView
                }
            });

            new ButtonView({
                app: this,
                players: players,
                expression: expression,
                timer: timer,
                undos: undos,
                blackWindowView: blackWindowView,
                el: '#yc-calculator'
            });

            // Make predefined texts fit to their containers.
            fitText();

            // Change the lengths of the notes gradient as it grows.
            resizeNotesGradient();

            // Hide the address bar in old Mobile Safari.
            window.scrollTo(0, document.body.scrollHeight);

            // Remove the 300ms delay on mobile devices.
            FastClick.attach(document.body);

        }

    });

    return App;

});
