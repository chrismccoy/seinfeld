#!/usr/bin/env bash

# trivia questions and answers

jq '. as {$episodes} | .questions[] |= (. as $q | $episodes[] | select($q.e == .episode and $q.s == .season) | $q + {title }) | .questions | .[] |= { season: .s, episode: .e, episode_title: .title, question: .text, answer: .answer} | sort_by(.season)' seinfeld.json

