# Week 09: 4/2/26

## Agenda

1. Moderation and Community Maintenance
2. Continue Mastodon

---

## Moderation and Community Maintenance

In 2024, on August 9th, there was rumour of an aquarium in BedStuy, a neighborhood in Brooklyn.

<img src="https://github.com/samheckle/images/blob/main/aquarium.png?raw=true" style="width:400px">

And there were some complaints posted in a [reddit thread](https://www.reddit.com/r/BedStuy/comments/1elrbju/fish_in_puddle_on_tompkins_and_hancock_animal/)

<img src="https://github.com/samheckle/images/blob/main/fish-puddle1.png?raw=true" style="width:400px">

<img src="https://github.com/samheckle/images/blob/main/fish-puddle2.png?raw=true" style="width:400px">

<img src="https://github.com/samheckle/images/blob/main/fish-puddle3.png?raw=true" style="width:400px">

A local newspaper picked this story up...

<img src="https://github.com/samheckle/images/blob/main/community.png?raw=true" style="width:400px">

And OP concluded their thread...

<img src="https://github.com/samheckle/images/blob/main/local-thread.png?raw=true" style="width:400px">

<img src="https://github.com/samheckle/images/blob/main/local-leadership.png?raw=true" style="width:400px">

But this was originally posted in the BedStuy subreddit

<img src="https://github.com/samheckle/images/blob/main/bedstuy.png?raw=true" style="width:400px">

And picked up by a "local newspaper"

<img src="https://github.com/samheckle/images/blob/main/local-newspaper.png?raw=true" style="width:400px">

Which exposed, and removed a lot of context, of a neighborhood issue. There are a lot of factors at play! And it became almost a globalized issue where everyone has an opinion. 

See [The Gamification of Public Discourse](https://youtu.be/1LpbGW3qLVg?si=K_KZqrUIqX7uxWva)

**does a neighborhood have official leadership?**
**how would that be designated?**

<details>

<summary>Fate of the Aquarium</summary>

On [October 25th](https://hellgatenyc.com/city-paved-over-bed-stuy-aquarium/), the city paved over the aquarium. 

<img src="https://github.com/samheckle/images/blob/main/paved.png?raw=true" style="width:400px">

**did the government act in the neighborhood's best interest?**

</details>

## Discussion

### What defines good moderation and community building?

- take 5 minutes to quietly write down what you think makes good moderation
    - what is required of users? what is required of maintainers/admins?
- where are examples of what you see as active / passive moderation?
    - an active example: deleting NSFW on a kitten forum
    - a passive example: on Bilibili the prompt “Leave a kind comment”

We will present these as a class and add them to [this doc](https://docs.google.com/document/d/1GaBk_rudTdG7p-28T8ooOv2mtDGwnfhpBhrJSG7qkkc/edit?tab=t.0)

### What rules do we want to define for our own community?

We will collectively be modifying the [server rules](https://networked-media.itp.io/about) to determine:

- how often are bots allowed to post (every hour, 10 minutes, 30 min, once a day, etc). this is minimum time to prevent spam
- other rules we define

## Setting up bot on Droplet

1. Log in to your server

```sh
ssh root@{your-ip-address}
```

2. Check your version of node that is installed on your server. 

```
node -v
```

If your version is >= 20.11.1, **then skip the next section**.

### <span style="background-color: #ff00f2">This only needs to be done ONCE. If you did this in class, you do not need to do this again.</span>
Following this [DigitalOcean tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04#option-3-installing-node-using-the-node-version-manager), we need to update our node version on our droplet.

1. Install node version manager (nvm)
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

2. Add nvm to the path on your droplet
```
source ~/.bashrc
```

3. You can view the whole list of available versions running `nvm list-remote`. We want to install `lts/iron`
```
nvm install lts/iron
```

4. To ensure the correct node version is installed, we want to run
```
node -v
```
Which should output `v20.11.1`

5. Sometimes your server will change the default node version, so in order to change that we need to run
```
nvm alias default 20.11.1
```
Which should output `default -> 20.11.1 (-> v20.11.1)`

### Upload your files to project 4 folder

Add the following files from your local to your project4 in Cyberduck

- `.env`
- `bot.js`
- `package.json`

Then test to make sure your bot runs in your droplet terminal:

```sh
node bot.js
```

Once you are finished with your bot, you will start it normally using pm2:

```sh
pm2 start bot.js
```

## Adding images to a mastodon post

Adding images is a two step process

First, we need to create the attachment that we would like to include. This can be from a local file *or* from an external link. 

```js
// using a local file
let localFile = await masto.v2.media.create({
  file: new Blob([fs.readFileSync("../some_image.png")]),
  description: "Some image",
});

// using a external url
const fetchedFile = await fetch("https://example.com/some_image.png");
const externalFile = await masto.v2.media.create({
  file: await fetchedFile.blob(),
  description: "Some image",
});
```

Then we just need to modify our status to use a `mediaIds` property:

```js
const status = await masto.v1.statuses.create({
  status: "the text to accompany the image",
  visibility: "public",
  // we can add up to 4 files per post using an array
  mediaIds: [localFile.id, externalFile.id],
});
```
